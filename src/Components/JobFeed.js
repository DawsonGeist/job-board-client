import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap'

import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const handleApplication = (event, user_id, company_id, job_title, setRefresh) => {
    event.preventDefault()
    axios.post('http://localhost:5156/api/User_Application', {
        user_id: user_id,
        company_id: company_id,
        job_title: job_title,
    })
    .then(res => {
        if(res.data && res.data.job_title == job_title) {
            alert('Application Submitted!')
            setRefresh(true)
        }
        else {
            alert(res.data.job_title)
        }
    })
    .catch(err => {
        console.log(err)
        alert('Error when creating user application')
    })
}

const JobFeed = () => {
    // This should be for having pledges on campus... Tobacco, Strippers, Alcohol.. Rating Users and Providers. Five dollars at the door. Scan ID's. Delay release of address information
    const [jobs, setJobs] = useState([])
    const [fetchJobs, setFetchJobs] = useState(true)
    const [refresh, setRefresh] = useState(true)

    // --- // --- //
    let context = JSON.parse(localStorage.getItem('context'))
    const navigation = useNavigate()

    useEffect(() => {
        if(refresh) {
            setRefresh(false)
            if(fetchJobs) {
                axios.get('http://localhost:5156/api/Job_Posting')
                .then(res => {
                    if (res.data) {
                        // Render job postings
                        console.log(res.data)
                        setJobs(res.data)
                        setFetchJobs(false)
                    }
                })
                .catch(err => {
                    console.log(err)    
                    alert('Error Fetching Job Postings')
                })
            }
        }
    })
    return (
        <div className='JobFeedParentContainer'>
            <h1>Job feed</h1>
            <>{jobs.map((job) => {
                let header = `${job.company.name} - ${job.posting.job_title}`
                return (
                    <div>
                        <h6>{header}</h6>
                        <p>{job.posting.description}</p>
                        <button className='btn btn-primary' onClick={(event) => {
                            console.log('APPLY')
                            var options = {
                                state: {
                                    company: job.company,
                                    posting: job.posting
                                }
                            }
                            handleApplication(event, context.user.user_id, job.company.company_id, job.posting.job_title, setRefresh)
                            navigation('/Apply', options)
                        }}>Apply</button>
                    </div>
                )
            })}</>
        </div>
    )
}

export default JobFeed