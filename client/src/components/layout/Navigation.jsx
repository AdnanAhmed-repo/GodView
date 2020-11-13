import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { logoutAdmin } from "../../redux/actions/adminActions"
import { Link } from 'react-router-dom'

import './Navigation.css'

const Navigation=(props)=> {
    
    const [admin, setAdmin] = useState(false)
    const handleLogout=()=>{
        localStorage.clear()
        props.logout()
    }
    useEffect(()=>{
        if(localStorage.getItem('user')){
            setAdmin(true)
        } else {
            setAdmin(false)
        }
    }, [props.user])

    return (
        <div className="navbar_container">
            <div className="logo">
                <img src="/logo.png" alt="logo"/>
                <h1>Network Zen Admin</h1>
            </div>

            <div className="nav_items">
                {admin?
                    <>
                        <Link className="nav_item" to="/admin-dashboard"><p>DASHBOARD</p></Link>
                        <Link onClick={handleLogout} className="nav_item" to="/"><p>LOGOUT</p></Link>
                    </> : <>
                        <Link className="nav_item" to="/admin-login"><p>LOGIN</p></Link>
                        <Link className="nav_item" to="/admin-signup"><p>SIGNUP</p></Link>
                    </>}
                
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
        logout:()=>dispatch(logoutAdmin())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Navigation)