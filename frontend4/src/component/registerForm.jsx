import {Register, Reset } from '../actions/userActions'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

function RegisterForm({Register, Reset , auth: {user, isLoading, isSuccess, isError}}) {

    const navigate = useNavigate()
    const [formdata, setFormdata] = useState({
        name: '',
        emai: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formdata

    const onChange = (e) => {
        setFormdata(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }
    useEffect(() => {
        if(isSuccess) {
            navigate('/contact')
        }
        Reset()
    }, [user])

    const onSubmit= (e) => {
        e.preventDefault()
        if(!name || !email || !password ||!password2) {
          return  toast.error('please fill all information required')
        }
        if(password !== password2) {
            return toast.error('your passwords dont match, type again')
        }
        console.log(formdata)
        Register({name, email, password})
        setFormdata({
            name: '',
            email: '',
            password: '',
            password2: ''
        })
       
    
        
    }

    return (
        <div className="w-1/4 mx-auto flex flex-col items-center justify-center">
            <h1 className="text-2xl text-blue-300 font-bold mx-auto">Account Register</h1>
            <form className="w-full" onSubmit={onSubmit}>
                <div className="w-full flex flex-col items-left justify-center my-4 ">
                    <label>Name</label>
                    <input onChange={onChange} value={name} type="text" className="w-full bg-zinc-200 h-10 rounded-md focus:outline-none" name="name"/>
                </div>
                <div className="w-full flex flex-col items-left justify-center my-4 ">
                    <label>Email</label>
                    <input onChange={onChange} value={email} type="email" className="w-full bg-zinc-200 h-10 rounded-md focus:outline-none" name="email"/>
                </div>
                <div className="w-full flex flex-col items-left justify-center my-4 ">
                    <label>Password</label>
                    <input onChange={onChange} value={password} type="password" className="w-full bg-zinc-200 h-10 rounded-md focus:outline-none" name="password"/>
                </div>
                <div className="w-full flex flex-col items-left justify-center my-4 ">
                    <label>Password2</label>
                    <input onChange={onChange} value={password2} type="password" className="w-full bg-zinc-200 h-10 rounded-md focus:outline-none" name="password2"/>
                </div>
                <button type='submit' className='btn btn-info w-full mt-6'>Submit</button>
            </form>
        </div>
    )
}

const mapPropstoState = state => ({
    auth: state.auth
})


export default connect(mapPropstoState, {Register, Reset })(RegisterForm)