import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap'

import { React, useState, useEffect } from 'react'

const JobPostingCompanyPreviewPill = ({job, selectedJob, setSelectedJob}) => {
    const [selected, setSelected] = useState(selectedJob.job_title == job.job_title)

    useEffect(() => {
        setSelected(selectedJob.job_title == job.job_title)
    })

    return (
        <div className='container' style={selected ? {backgroundColor:'lightgray'} : {backgroundColor:'white'}} onClick={(event) => {
            setSelected(!selected)
            setSelectedJob(job)
            console.log(`Job ${job.job_title} Clicked`)
        }}>
            <p>{job.job_title}</p>
        </div>
    )
}

export default JobPostingCompanyPreviewPill