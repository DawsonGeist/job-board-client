import { React, useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap'

import JobPostingCompanyPreviewPill from './JobPostingCompanyPreviewPill';

const renderUserPreview = (res) => {
    
} 

const JobPostingStatisticsComponent = ({selectedJob}) => {
    let context = JSON.parse(localStorage.getItem('context'))
    const [applications, setApplications] = useState([])
    
    useEffect(() => {
        console.log('Getting Selected Job Statistics')
        axios.get(`http://localhost:5156/api/User_Application/${context.company.company_id}/${selectedJob.job_title}`)
        .then(res => {
            if(res.data) {
                console.log(res.data)
                setApplications(res.data)
            }
        })
    }, [selectedJob])

    let subHeader = `Number of Applicants: ${applications.length}`
    if(selectedJob != null) {
        return (
            <div>
                <h6>{selectedJob.job_title}</h6>
                <p>{subHeader}</p>
                <div style={{backgroundColor:'lightgrey'}}>
                    <ul>{applications.map((res) => {
                        let username = `${res.user.last_name}, ${res.user.first_name}`;
                        return (
                            <div className='row'>
                                <div className='col'>
                                    <p>{username}</p>
                                </div>
                                <div className='col'>
                                    <p>{res.user.email}</p>  
                                </div>
                            </div>
                        );
                    })}</ul>
                </div>
            </div>
        )
    }
    else {
        return (
            <p>loading...</p>
        )
    }
}

export default JobPostingStatisticsComponent