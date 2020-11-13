import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CircularProgress from '@material-ui/core/CircularProgress';
import {fetchUsers} from '../../redux/actions/dashboardActions'
import {Link} from 'react-router-dom'

import './AdminDashboard.css'

const AdminDashboard=(props)=> {

    useEffect(() => {
        props.fetchUsers()
        
    }, [])

    return (
        <div className="admin_dashboard">
            {props.fetching?<>
                <CircularProgress style={{color: "white"}} thickness={6} size={40} />
            </>:<>
            {props.users&&props.users.map((ele)=>
                <div key={ele._id} className="company_tab">
                    <p className="bname">{ele.bname}</p>
                    <Link className="link_details" to={`admin-dashboard/${ele._id}`}>
                        <div className="bname_details">
                            <NavigateNextIcon />
                        </div>
                    </Link>
                </div>)
            }
            </>}
            

            {/* else part */}
            
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        fetching: state.dashboard.fetching,
        users: state.dashboard.success.users
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        fetchUsers: ()=>dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)