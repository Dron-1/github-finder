/*| to know about reducers, read "https://www.robinwieruch.de/javascript-reducer/" & https://www.w3schools.com/react/react_usereducer.asp | */
/*| Basically reducers are there to manage state(s) in an application. |*/

const githubReducer = (state, action) => {
    switch(action.type)
    {
        case 'GET_USERS' :
            return {
                ...state,
                users: action.payload,
                loading: false,
                // updating the state, updating users(empty array) with github users and changing loading to false
            }

        case 'GET-USER' :
            return {
                ...state,
                user: action.payload,
                loading: false,
            }
    
        case 'SET-LOADING' :
            return{
                ...state,
                loading : true,
            }

        case 'CLEAR-USERS' :
            return{
                ...state,
                users: [],
            }
        default:
            return state
    }
}

export default githubReducer