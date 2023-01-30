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
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer,initialState)

    //function to search users based on text
    const searchUsers = async(text) => {
        setLoading()
        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_API}/search/users?${params}`)

        /*| response is an object now, which has property items that contains list of matching users |*/
        /*| destructuring items from response object |*/
        const { items } = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload : items
        })
    } 

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
  //TODO: write function to Get DEtails per user
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

  return (
    <GithubContext.Provider value = {{
        users : state.users,
        user : state.user,
        loading: state.loading,
        searchUsers,
        getUser,
        clearUsers
    }}>
        {children}
    </GithubContext.Provider>
  )
}

export default GithubContext 