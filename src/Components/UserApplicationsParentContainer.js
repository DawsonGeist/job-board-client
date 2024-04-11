import { React, useState, useEffect } from 'react';
import '../styles.css'

import UserApplicationsListComponent from './UserApplicationsListComponent';
import CompanyPreviewComponentUserApp from './CompanyPreviewComponentUserApp'


const UserApplicationsParentComponent = () => {
    const [selectedJob, setSelectedJob] = useState({})
    const [selectedPost, setSelectedPost] = useState(null)
    const [refreshStatistics, setRefreshStatistics] = useState(false)
    return (
        <div className='parentPageContainer'>
            <h1>Applications</h1>
            <div className='row'>
                <div className='col'>
                    <h3>Active Applications</h3>
                    <UserApplicationsListComponent selectedJob={selectedJob} setSelectedJob={setSelectedJob} setSelectedPost={setSelectedPost}/>
                </div>
                <div className='col'>
                    <h3>Details</h3>
                    <CompanyPreviewComponentUserApp selectedPost={selectedPost}/>
                </div>
            </div>
        </div>
    )
}

export default UserApplicationsParentComponent;