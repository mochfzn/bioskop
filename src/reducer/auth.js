const defaultState = {
    login: false,
    role: -1,
    user: ""
}

const authReducer = (state = defaultState, action) => {
    switch(action.type)
    {
        case "login":
            return {
                login: true,
                role: action.role,
                user: action.idUser
            }
        case "logout":
            return {
                login: false,
                role: -1,
                user: ""
            }
        default:
            return state;
    }
}

export default authReducer;