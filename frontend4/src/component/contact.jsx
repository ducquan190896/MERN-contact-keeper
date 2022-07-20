
import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getContacts, addcontact, Resetcontacts, UpdateContact} from '../actions/contactActions'
import ContactCard from './contactcard'
import {toast} from 'react-toastify'

function Contact({auth : {user}, Contact : {contacts, contact, isSuccess2, isError2}, getContacts, addcontact, Resetcontacts, UpdateContact}) {
    const [formdata, setFormdata] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
     })
     const {name, email, phone, type} = formdata
     useEffect(() => {

        if(user) {
            getContacts(user.token)
        }
        if(contact) {
            setFormdata(contact)
        }
     }, [user, isSuccess2, contact])


     const onChange = (e) => {
        // console.log(e.target.value)
        setFormdata(prevState => ({...prevState, [e.target.name]: e.target.value}))
        
     }
     const onSubmit = (e) => {
        e.preventDefault()
        console.log(formdata)
        if(contact) {
            if(user) {
                UpdateContact(user.token, formdata)
                toast.success('your contact is already updated')
            }
          
        }
        else {
            if(user) {
            addcontact(user.token, formdata)
            toast.success('new contact is already added')
        }
            
        }
        setFormdata({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
     }


    return (
        <div className='w-full flex flex-row justify-between items-start px-10'>
            <form action="" className='w-1/2 px-5 mr-10 flex flex-col items-center justify-center' onSubmit={onSubmit}>
                <h1 className='mx-auto text-2xl text-blue-400 font-bold'>{contact ? 'Update Contact' : 'Add Contact'}</h1>
                <input onChange={onChange} value={name} name='name' type="text" className='input input-border w-2/3 border border-black my-6 focus:outline-none' placeholder='Name'/>
                <input onChange={onChange} value={email} name='email' type="email" className='input input-border w-2/3 border border-black my-6 focus:outline-none' placeholder='Email'/>
                <input onChange={onChange} value={phone} name='phone' type="number" className='input input-border w-2/3 border border-black my-6 focus:outline-none' placeholder='Phone'/>
                <p className='my-2'>Contact Type</p>
                <div className='flex my-4 items-left justify-center'>
                    <div className='flex items-center justify-center mr-6'>
                        <label >Personal</label>
                        <input onChange={onChange} type="radio" className='radio mx-2' id='personal' name='type' checked={type === 'personal'} value='personal'/>
                    </div>
                    <div className='flex items-center justify-center mr-6'>
                        <label >Professional</label>
                        <input onChange={onChange}  type="radio" className='radio mx-2' id='personal' name='type' checked={type === 'professional'} value='professional'/>
                    </div>
                </div>
                <button type='submit' onSubmit={onSubmit} className='btn btn-success w-full my-6'>{contact ? 'Update' : 'Submit'}</button>
                
            </form>
            <div className='w-1/2 px-5 ml-10 flex flex-col items-center justify-center'>
                {contacts && contacts.map(contactitem => <ContactCard contactitem={contactitem}></ContactCard>)}
            </div>
        </div>
    )
}

const mapsPropstoState = state => ({
    auth: state.auth,
    Contact: state.Contact
})

export default connect(mapsPropstoState, {getContacts,  addcontact, Resetcontacts, UpdateContact})(Contact)