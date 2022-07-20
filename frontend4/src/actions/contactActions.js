export const getContacts = (token) => async (dispatch) => {
    try {
        const res = await fetch('http://localhost:5000/api/contacts/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        console.log(data)
        dispatch({
            type: 'get_contacts',
            payload: data
        })

    } catch (err) {
        dispatch({
            type: 'get_error',
            payload: err.message
        })
    }
}

export const Resetcontacts = () => (dispatch) => {
    dispatch({
        type: 'reset_contact'
    })
}

export const addcontact = (token, formdata) => async (dispatch) => {
    try {
        const res = await fetch('http://localhost:5000/api/contacts/addcontact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formdata)
        })
        const data = await res.json()
        console.log(data)
        dispatch({
            type: 'add_contact',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'get_error',
            payload: err.message
        })
    }
}

export const Deletecontact = (token, contactid) => async (dispatch) => {
    try {
        const res = await fetch(`http://localhost:5000/api/contacts/${contactid.toString()}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        dispatch({
            type: 'delete_contact',
            payload: contactid
        })
    } catch (err) {
        dispatch({
            type: 'get_error',
            payload: err.message
        })
    }
}

export const UpdateContact = (token, contactitem) => async (dispatch) => {
    try {
        const res = await fetch(`http://localhost:5000/api/contacts/${contactitem._id.toString()}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(contactitem)
        })
        const data = await res.json()
        dispatch({
            type: 'update_contact',
            payload: data
        })

    } catch (err) {
        dispatch({
            type: 'get_error',
            payload: err.message
        })
    }
}

export const Addintocontact = (contact) => (dispatch) => {
    dispatch({
        type: 'addIntoContact',
        payload: contact
    })
}