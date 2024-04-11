import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'
import logo from '../Assets/coffeeLogo.png'
import axios from 'axios';

const handleCreateJobPosting = (event, company_id, job_title, desc, is_active, setRefresh, setSuccess) => {
    event.preventDefault()
    axios.post(`http://localhost:5156/api/Job_Posting`, {
        company_id: company_id,
        job_title: job_title,
        description: desc,
        is_active: is_active,
    })
    .then(res => {
        if(res.data && res.data.job_title == job_title) {
            alert('Job Posting Created Successfully')
            setSuccess(true)
            setRefresh(true)
        }
        else {
            alert(res.data.job_title)
        }
    })
    .catch(err => {
        console.log(err)
        alert('Error when creating job posting')
    })
}

const CreateJobPosting = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [is_active, setIs_Active] = useState(1)
    const [refresh, setRefresh] = useState(true)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate();
    
    let context = JSON.parse(localStorage.getItem('context'))

    useEffect(() => {
        if(refresh) {
            setRefresh(false)
            if(success) {
                //Navigate to home page
                navigate('../')
            }
        }
    })

    return (
        <div className='loginComponentContainer'>
            <h1>Create Job Posting</h1>
            
            <label for="InputEmail" class="form-label">Job Title:</label>
            <input type="text" class="form-control" id="InputEmail" required onChange={(event) => {
                setTitle(event.target.value)
            }}/>
            
            <label for="InputPass" class="form-label">Description:</label>
            <input type="text" class="form-control" id="InputPass" required onChange={(event) => {
                setDesc(event.target.value)
            }}/>
            <button className='btn btn-primary' onClick={(event) => {
                console.log('Create Job Posting')
                handleCreateJobPosting(event, context.company.company_id, title, desc, is_active, setRefresh, setSuccess)
            }}>Create</button>

            <div style={{paddingTop:'1%'}}>
                <p>Don't have an account? <a href='/signup'>Sign up</a></p>
            </div>
        </div>
    );
}

export default CreateJobPosting