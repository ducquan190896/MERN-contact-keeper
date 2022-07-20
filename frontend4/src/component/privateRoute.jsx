import { Outlet, Navigate } from "react-router-dom";
import Loginform from "./Loginform";
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'


function PrivateRoute({auth: {user, isSuccess}}) {
    const [isProtect, setIsProtect] = useState(false)
    useEffect(() => {
        if(user) {
            setIsProtect(true)
        }
    }, [user])
 
    return (
        <>
        {user ? <Outlet/> : <Navigate to='/login'/>}
        </>
    )    
}

const mapPropstoState = state => ({
    auth: state.auth
})

export default connect(mapPropstoState)(PrivateRoute)