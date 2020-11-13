import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchCompany} from '../../redux/actions/companyActions'
import CircularProgress from '@material-ui/core/CircularProgress';

import './CompanyDetails.css'

const CompanyDetails = (props) => {
    useEffect(()=>{
        let id = props.props.match.params.id
        props.fetchCompany(id)

    }, [])

    return (
        <div className="company_details">
            {/* header */}
            {props.loading?
                <div className="company_loader">
                    <CircularProgress style={{color: "black"}} thickness={6} size={40} />
                </div>  :
                <>
                    {props.company&&
                    <>
                        <div className="company_header">
                            <div className="company_name">
                                <h2>{props.company.bname}</h2>
                                <p>Joined date: <strong>{new Date(props.company.date).toLocaleDateString()}</strong></p>
                            </div>
                            <div className="company_score">
                                <h2>Risk Score: {props.company.riskScore}</h2>
                                <button>Edit Score</button>
                            </div>
                            <div className="header_buttons">
                                <button className="ban">Ban User</button>
                                <button className="delete">Delete Account</button>
                            </div>
                        </div>

                        {/* body */}
                        <div className="company_body">
                            <h1>EDITING AREA</h1>
                        </div>
                        </>
                    }
                </>
                
            }
        </div>
    )
}
const mapStateToProps=(state)=>{
    return{
        loading: state.company.loading,
        company: state.company.success.data,
        error: state.company.error
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        fetchCompany: (id)=>dispatch(fetchCompany(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails)
