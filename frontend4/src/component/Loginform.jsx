import {Register, Reset, Login} from '../actions/userActions'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

function Loginform({Login, Reset , auth: {user, isLoading, isSuccess, isError}}) {

    const navigate = useNavigate()
    const [formdata, setFormdata] = useState({
        
        email: '',
        password: ''
       
    })

    const { email, password} = formdata

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
        if( !email || !password) {
          return  toast.error('please fill all information required')
        }
       
        console.log(formdata)
        Login(formdata)
        setFormdata({
            
            email: '',
            password: ''
           
        })
       
        
        
    }

    return (
        <div className="w-1/4 mx-auto flex flex-col items-center justify-center">
            <h1 className="text-2xl text-blue-300 font-bold mx-auto">Account Login</h1>
            <form className="w-full" onSubmit={onSubmit}>
               
                <div className="w-full flex flex-col items-left justify-center my-4 ">
                    <label>Email</label>
                    <input onChange={onChange} value={email} type="email" className="w-full bg-zinc-200 h-10 rounded-md focus:outline-none" name="email"/>
                </div>
                <div className="w-full flex flex-col items-left justify-center my-4 ">
                    <label>Password</label>
                    <input onChange={onChange} value={password} type="password" className="w-full bg-zinc-200 h-10 rounded-md focus:outline-none" name="password"/>
                </div>
               
                <button type='submit' className='btn btn-info w-full my-6'>Submit</button>
            </form>
        </div>
    )
}

const mapPropstoState = state => ({
    auth: state.auth
})


export default connect(mapPropstoState, {Register, Reset, Login })(Loginform)