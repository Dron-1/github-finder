const AlertReducer = (state, action) => {
    switch(action.type){
        case 'ADD-ALERT' :
            return action.payload

        case 'REMOVE-ALERT' :
            return null
            
        default:
            return state
    }
}


export default AlertReducer;