import {React, useState, useEffect} from 'react'

const handleOnSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const url = new URL(form.action);
    const formData = new FormData(form);

    /** @type {Parameters<fetch>[1]} */
    const fetchOptions = {
        method: form.method,
        body: formData,
    }

    fetch(url, fetchOptions).then(res => {
        alert(`File Upload Status: ${res.statusText}`)
    })
}


const ApplyToPostingParentComponent = ({company, posting}) => {
    const [resumePath, setResumePath] = useState('')
    const [coverLetterPath, setCoverLetterPath] = useState('')

    return (
        <div className='container'>
            <h1>Application Portal</h1>
            <div className='jobDetails mt-4'>
                <div className='row'>
                    <div className='col'>
                        <h6>Company:</h6>
                        <p>{company.name}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <h6>Job Title:</h6>
                        <p>{posting.job_title}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <h6>Job Description:</h6>
                        <p>{posting.description}</p>
                    </div>
                </div>
            </div>
            <div className='userInputSection mt-5'>
                <h6>Required Docs</h6>
                <div className='row'>
                    <div className='d-inline-block d-flex flex-row justify-content-around' style={{alignSelf:'center'}}>
                        <h6>Resume:</h6>
                        <form action="http://localhost:5156/api/ApplicationUpload" method="post" enctype="multipart/form-data" onSubmit={(event) => {
                            handleOnSubmit(event)
                        }}>
                            <input id="file" name="file" type="file" />
                            <button>Upload</button>
                        </form>
                    </div>
                </div>
                <div className='row'>    
                    <div className='d-inline-block d-flex flex-row justify-content-around' style={{alignSelf:'center'}}>
                        <h6>Cover Letter:</h6>
                        <form action="http://localhost:5156/api/ApplicationUpload" method="post" enctype="multipart/form-data" onSubmit={(event) => {
                            handleOnSubmit(event)
                        }}>
                            <input id="file" name="file" type="file" />
                            <button>Upload</button>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplyToPostingParentComponent