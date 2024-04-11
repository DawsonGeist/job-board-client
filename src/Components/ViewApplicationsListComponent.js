import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap'

import JobPostingCompanyPreviewPill from './JobPostingCompanyPreviewPill';

import { React, useState, useEffect } from 'react'

const ViewApplicationsListComponent = ({selectedJob, setSelectedJob}) => {
    // This should be for having pledges on campus... Tobacco, Strippers, Alcohol.. Rating Users and Providers. Five dollars at the door. Scan ID's. Delay release of address information
    const [jobs, setJobs] = useState([])
    const [fetchJobs, setFetchJobs] = useState(true)
    const [refresh, setRefresh] = useState(true)

    // --- // --- // We are a company
    let context = JSON.parse(localStorage.getItem('context'))

    useEffect(() => {
        if(refresh) {
            setRefresh(false)
            if(fetchJobs) {
                // Get the Job Postings then fetch the associated User_applications
                axios.get(`http://localhost:5156/api/Job_Posting/${context.company.company_id}`)
                .then(res => {
                    if (res.data) {
                        // Render job postings
                        console.log(res.data)
                        setJobs(res.data)
                        setFetchJobs(false)
                        setSelectedJob(res.data[0])
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
            <div>{jobs.map((job) => {
                return (
                    <JobPostingCompanyPreviewPill job={job} selectedJob={selectedJob} setSelectedJob={setSelectedJob}/>
                )
            })}</div>
        </div>
    )
}

export default ViewApplicationsListComponent