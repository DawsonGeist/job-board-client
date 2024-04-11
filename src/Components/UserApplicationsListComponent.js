import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap'

import JobPostingCompanyPreviewPill from './JobPostingCompanyPreviewPill';

import { React, useState, useEffect } from 'react'

const UserApplicationsListComponent = ({setSelectedJob, selectedJob, setSelectedPost}) => {
    // This should be for having pledges on campus... Tobacco, Strippers, Alcohol.. Rating Users and Providers. Five dollars at the door. Scan ID's. Delay release of address information
    const [apps, setApps] = useState([])
    const [fetchApps, setFetchApps] = useState(true)
    const [refresh, setRefresh] = useState(true)
    setSelectedPost(apps.find(app => app.post.job_title == selectedJob.job_title && app.post.company_id == selectedJob.company_id))

    // --- // --- // We are a company
    let context = JSON.parse(localStorage.getItem('context'))

    useEffect(() => {
        if(refresh) {
            setRefresh(false)
            if(fetchApps) {
                // Get the Job Postings then fetch the associated User_applications
                axios.get(`http://localhost:5156/api/User_Application/${context.user.user_id}`)
                .then(res => {
                    if (res.data) {
                        // Render job postings
                        console.log(res.data)
                        setApps(res.data)
                        setSelectedJob(res.data[0].post)
                        setFetchApps(false)
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
            <div>{apps.map((app) => {
                return (
                    <JobPostingCompanyPreviewPill job={app.post} selectedJob={selectedJob} setSelectedJob={setSelectedJob}/>
                )
            })}</div>
        </div>
    )
}

export default UserApplicationsListComponent