export const setuserDetails = (userDetails) => ({
    type : 'SET_USER_DETAILS',
    payload : userDetails
});

export const logout = () => ({
    type : 'LOGOUT'
});