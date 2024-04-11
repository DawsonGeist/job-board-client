import { React, useState, useEffect } from 'react';
import '../styles.css'

import ViewApplicationsListComponent from './ViewApplicationsListComponent';
import JobPostingStatisticsComponent from './JobPostingStatisticsComponent';


const ViewApplicationsComponent = () => {
    const [selectedJob, setSelectedJob] = useState({})
    const [refreshStatistics, setRefreshStatistics] = useState(false)
    return (
        <div className='parentPageContainer'>
            <h1>Active Job Postings</h1>
            <div className='row'>
                <div className='col'>
                    <ViewApplicationsListComponent selectedJob={selectedJob} setSelectedJob={setSelectedJob}/>
                </div>
                <div className='col'>
                    <JobPostingStatisticsComponent selectedJob={selectedJob}/>
                </div>
            </div>
        </div>
    )
}

export default ViewApplicationsComponent;