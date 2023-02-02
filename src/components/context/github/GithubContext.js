import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_API = process.env.REACT_APP_GITHUB_API;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {

    //added for reducer
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer,initialState)

  /*| deleted search users func |*/

  const clearUsers = () => {
    dispatch({
        type: 'CLEAR-USERS',
    })
  }  

  //function to setLoading to true
  const setLoading = () => {
    dispatch({type:'SET-LOADING'})
  }

  //function to show details of single User
  const getUser = async(login) => {
    setLoading();

    const response = await fetch(`${GITHUB_API}/users/${login}`) ;

    if(response.status === 404)
    {
      window.location = '/notfound';
    }
    else
    {
      const data = await response.json();

      dispatch({
        type: 'GET-USER',
        payload: data,
      })
    }
  }

  // function to get array of user repos
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10
    })

    const response = await fetch(`${GITHUB_API}/users/${login}/repos?${params}`);
    const data = await response.json();
    
    dispatch({
      type: 'GET-USER-REPOS',
      payload: data,
    })
  }

  return (
    <GithubContext.Provider value = {{
        // users : state.users,
        // user : state.user,
        // loading: state.loading,
        // repos: state.repos,
        ...state,                      /*| ...state means = users, user, loading, repos |*/
        dispatch,
        getUser,
        clearUsers,
        getUserRepos,
    }}>
        {children}
    </GithubContext.Provider>
  )
}

export default GithubContext 