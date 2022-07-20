const initalState = {
    user: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: null
}

export default (state = initalState, action) => {
    switch (action.type) {
        case 'register_user': 
            return {
                ...state,
                isSuccess: true,
                user: action.payload
            }
        case 'Error_case':
            return {
                ...state,
                isError: true,
                isSuccess: false,
                user: null,
                message: action.payload
            }
        case 'user_login':
            return {
                ...state,
                isError: false,
                isSuccess: true,
                user: action.payload
            } 
        case 'Log_out':
            return {
                ...state,
                isError: false,
                isSuccess: true,
                message: null,
                isLoading: false,
                user: null
            }
        case 'reset': 
        return {
            ...state,
            isSuccess: false,
            isError: false,
            isLoading: false
        }
        default:
        return state
    }
}