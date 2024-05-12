const initialState = {
    userDetails : {},
    isAuthenticated : false
}

const userReducer = (state = initialState,action) => {
    switch(action.type){
        case 'SET_USER_DETAILS':
            return{
                ...state,
                userDetails : action.payload,
                isAuthenticated : true
            };
        case 'LOGOUT' :
            return {
                ...state,
                userDetails : null,
                isAuthenticated : false
            }
         default :
           return state;
    }
}

export default userReducer