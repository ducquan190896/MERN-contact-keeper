

export const Register = (formdata) => async (dispatch) => {
    try {
        console.log(formdata)
        const response = await fetch('http://localhost:5000/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        })
        const data = await response.json()
        dispatch({
            type: 'register_user',
            payload: data
        })
        
       
    } catch (err) {
        dispatch({
            type: 'Error_case',
            payload: err.message
        })
    }
}
export const Reset = () => (dispatch) => {
    console.log('reset')
    
        dispatch({
            type: 'reset'
        })
    
}

export const Login = (formdata) => async (dispatch) => {
    try {
        console.log(formdata)
        const response = await fetch('http://localhost:5000/api/users/signin',  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        })
        const data = await response.json()
        dispatch({
            type: 'user_login',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'Error_case',
            payload: err.message
        })
    }
}

export const LogOut = () => (dispatch) => {
    dispatch({
        type: 'Log_out'
    })
}