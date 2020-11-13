import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { loginAdmin } from "../../redux/actions/adminActions"
import CircularProgress from '@material-ui/core/CircularProgress';

import './LoginSignup.css'

function AdminLogin(props) {

    const [input, setInput] = useState({email:"", password:""})
    const [loading, setLoading] = useState(false)

    const handleInput= (e)=>{
        setInput({...input, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        setLoading(props.user.admin.loading)
        if(localStorage.getItem('user')){
            props.props.history.push('/admin-dashboard')
        }
    }, [props.user])

    return (
        <div className="login_container">

            <div className="form">
                <h1>Admin Login</h1>
                <label htmlFor="email">Admin Email</label>
                <input onChange={handleInput} type="email" name="email" placeholder="Enter your email"/>
                <label htmlFor="password">Admin Password</label>
                <input onChange={handleInput} type="password" name="password" placeholder="Enter your password"/>
                <button onClick={()=>props.login(input)}>{loading?<CircularProgress style={{color: "white"}} thickness={6} size={12} color="secondary" />:"Login"}</button>
            </div>
        </div>  
    )
}

const mapStateToProps=(state)=>{
    return{
        user:state
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        login: (data)=>dispatch(loginAdmin(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin)
