import React, {useState, useEffect} from 'react'
import { signupAdmin } from "../../redux/actions/adminActions"
import {connect} from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';



function AdminSignup(props) {

    const [input, setInput] = useState({ name:"", email:"", password:"",})
    const [loading, setLoading] = useState(true)

    const handleInput= (e)=>{
        setInput({...input, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        setLoading(props.user.admin.loading)
        console.log("prooops---", props.user)
        if(localStorage.getItem('user')){
            props.props.history.push('/admin-dashboard')
        }
    }, [props.user])

    return (
        <div className="login_container">
            {console.log(input)}
            <div className="form">
                <h1>Admin Signup</h1>
                <label htmlFor="name">Admin Name</label>
                <input onChange={handleInput} type="text" name="name" placeholder="Enter your name"/>
                <label htmlFor="email">Admin Email</label>
                <input onChange={handleInput} type="email" name="email" placeholder="Enter your email"/>
                <label htmlFor="password">Admin Password</label>
                <input onChange={handleInput} type="password" name="password" placeholder="Enter your password"/>
                <button onClick={()=>props.signup(input)}>{loading?<CircularProgress style={{color: "white"}} thickness={6} size={12} color="secondary" />:"Signup"}</button>
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
        signup: (data)=>dispatch(signupAdmin(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSignup)
