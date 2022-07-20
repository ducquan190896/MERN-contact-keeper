const initialState = {
    contacts: [],
    contact: null,
    isSuccess2: false,
    isError2: false,
    message2: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'get_contacts': 
            return {
                ...state,
                contacts: action.payload,
                isSuccess2: true
            }
        case 'get_error':
            return {
                ...state,
                isError2: true,
                message2: action.payload
            }

        case 'add_contact': 
            return {
                ...state,
                isSuccess2: true,
                
                contacts: [...state.contacts, action.payload]
            }
        case 'delete_contact': 
            return {
                ...state,
                contacts: state.contacts.filter(item => item._id.toString() !== action.payload.toString())
            }
        case 'update_contact': 
            return {
                ...state,
                contacts: state.contacts.map(item => item._id.toString() !== action.payload._id.toString() ? action.payload : item),
                isSuccess2: true,
                contact: null
            }
        case 'addIntoContact': 
            return {
                ...state,
                contact: action.payload,
                isSuccess2: true
            }
        
        case 'reset_contact':
            return {
                ...state,
                isSuccess2: false,
                isError2: false,
                contacts: [],
                contact: null
            }
        default: 
            return state
    }
}