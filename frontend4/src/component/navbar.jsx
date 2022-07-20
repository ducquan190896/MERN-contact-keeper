import {AiFillContacts} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {useEffect, useState} from 'react'
import {LogOut} from '../actions/userActions'
import {Resetcontacts} from '../actions/contactActions'

function Navbar({auth: {user, isSuccess}, LogOut, Resetcontacts}) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if(user) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [user])
    const onClick = () => {
        
            LogOut()
            Resetcontacts()
            
    }

    return (
        <div className=" w-full h-20 flex justify-between px-10 py-4 bg-gray-400 mb-10">
           <div className='flex flex-row items-center justify-center'>
                <AiFillContacts className='text-4xl mr-6 text-gray-500'></AiFillContacts>
                <h1 className='font-bold text-2xl'>Contact Keeper</h1>
           </div>
           
              {isOpen === false ? (
                <div className='flex flex-row items-center justify-center'>
                 <Link to='/register' className='text-sky-600 text-2xl  active:text-orange-600 mr-8'>Register</Link>
                <Link to='/login' className='text-sky-600 text-2xl  active:text-orange-600'>Log In</Link>
                </div>
              ) : (
                <div className='flex flex-row items-center justify-center'>
                 <button className='text-sky-600 text-2xl  active:text-orange-600' onClick={onClick}>Log Out</button>
                 </div>
              )}
           
        </div>
    )
}

const mapPropstoState = state => ({
    auth: state.auth
})

export default connect(mapPropstoState, {LogOut, Resetcontacts})(Navbar)