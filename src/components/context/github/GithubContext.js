import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({children}) => {

    //added for reducer
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer,initialState)

  /*| deleted search users func and added to GithubActions.js|*/
  
  /*| deleted clearUsers func coz now we can clearUsers directly by using dispatch |*/
  /*| deleted getUser, getUserRepos funcs and added to GithubActions.js|*/

  /*| deleted setLoading func coz now we can set-loading directly by using dispatch |*/
  
  return (
    <GithubContext.Provider value = {{
        ...state,                      /*| ...state means = users, user, loading, repos |*/
        dispatch,
    }}>
        {children}
    </GithubContext.Provider>
  )
}

export default GithubContext 