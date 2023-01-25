/*| adding reducers to manage global states instead of useState |*/
/*| in comments is when we use hook->useState, without comments is when we use hook->useReducer() |*/

// import { createContext, useState } from "react";
import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_API = process.env.REACT_APP_GITHUB_API;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {

    //added for reducer
    const initialState = {
        users: [],
        loading: true,
    }
    // const [users,setUsers] = useState([])                   //| not required while using reducer
    // const [loading, setLoading] = useState(true)            //| not required while using reducer

    /*| syntax-> useReducer(<reducer>, <initialState>) |*/
    /*| The useReducer Hook returns the current state and a dispatch method. |*/
    /*| dispatch method is used to set the action object, dispatch is used to setState |*/
    const [state, dispatch] = useReducer(githubReducer,initialState)

    const getUsersList = async () =>
    {
        const response = await fetch(`${GITHUB_API}/users`,{
            headers : {
            Authorization : `token ${GITHUB_TOKEN}`
            }
        })

    const data = await response.json()
    console.log(data);

    // setUsers(data);                     //| not required while using reducer
    // setLoading(false);                  //| not required while using reducer


    //dispatch calls the reducer function and sending type is important because reducer works on this action type
    dispatch({
        type: 'GET_USERS',
        payload: data
    })
  } 

  return (
    <GithubContext.Provider value = {{
        users : state.users,
        loading: state.loading,
        getUsersList,
    }}>
        {children}
    </GithubContext.Provider>
  )
}

export default GithubContext 