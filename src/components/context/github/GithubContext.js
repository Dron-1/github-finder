import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_API = process.env.REACT_APP_GITHUB_API;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {

    //added for reducer
    const initialState = {
        users: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer,initialState)

    //this function is not required in project (Only for Testing Purposes)
    // const getUsersList = async () =>
    // {
    //     setLoading(); 
    //     const response = await fetch(`${GITHUB_API}/users`);

    //     const data = await response.json()
    //     console.log(data);

    //     //dispatch calls the reducer function and sending type is important because reducer works on this action type
    //     dispatch({
    //         type: 'GET_USERS',
    //         payload: data
    //     })
    // }
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

  return (
    <GithubContext.Provider value = {{
        users : state.users,
        loading: state.loading,
        searchUsers,
        clearUsers
    }}>
        {children}
    </GithubContext.Provider>
  )
}

export default GithubContext 