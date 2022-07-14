import {BsPersonBadge} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useEffect, useState} from 'react'


function Navbar()  {
    const {user} = useSelector(state => state.auth)
    const [name, setName] = useState('' )
    useEffect(() => {
        if(user) {
            setName(user.name)
        }
    }, [user])
    
    return (
        <div className='w-full h-14 px-6 bg-blue-400 flex justify-between items-center'>
            <h1 className='inline-flex items-center justify text-2xl font-bold text-slate-200'><BsPersonBadge/> Contact Keeper</h1>
            
            {!user && (
                 <div className='flex items-center justify-between'>
                <Link to='/register' className='text-lg font-bold text-slate-200 cursor-pointer'>Register</Link>
                <Link  to='/login' className='ml-6 text-lg font-bold text-slate-200 cursor-pointer'>Login</Link>
            </div>
            )}
            {user && (
                <div className='flex items-center justify-between'>
                <h1 className='text-lg font-bold text-slate-200 cursor-pointer'>{name}</h1>
                <Link  to='/login' className='ml-6 text-lg font-bold text-slate-200 cursor-pointer'>LogOut</Link>
            </div>
            )}
        </div>
    )
}

export default Navbar