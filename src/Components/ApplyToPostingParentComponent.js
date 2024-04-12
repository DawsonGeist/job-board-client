import {React, useState, useEffect} from 'react'
import axios from 'axios'


const renderSubmissionPreview = (appContent) => {
    if(appContent != null && appContent != "loading") {
        return (
            <div className='container'>
                <h4>Work Expeirence</h4>
                <br/>
                <div>{appContent.Work_History.map(job => {
                    console.log("JOB")
                    console.log(job)
                    return (
                        <div className='container'>
                            <h5>{job.Title}</h5>
                            <h6>{job.Company}</h6>
                            <p>{job.Dates}</p>
                            <br/>
                            <div>{job.Responsibilities.map(responsibility => {
                                return (
                                    <p>{responsibility}</p>
                                )
                            })}</div>
                            <br/>
                        </div>
                    );
                })}</div>
            </div>
        )
    }
    else if(appContent == "loading") {
        return (
            <div className='container'>
                <h3>AI is parsing your resume, please hold</h3>
            </div>
        )
    }
    else {
        return (
            <div className='container'>
                <p>Upload your resume to preview and edit what recruiters will see</p>
            </div>
        )
    }
}

const handleOnSubmit = (event, setAppContent) => {
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
        //console.log(res)
        res.body.getReader().read().then(content => {
            var dc = new TextDecoder()
            var y = dc.decode(content.value)
            var x = JSON.parse(y)
            var response = JSON.parse((x[0]).resume)
            var sectionsStr = (response.choices[0]).message.content
            var sections = JSON.parse(sectionsStr)
            console.log(sections)
            setAppContent(sections)
        })
        alert(`File Upload Status: ${res.statusText}`)
    })
}


const ApplyToPostingParentComponent = ({company, posting}) => {
    const [appContent, setAppContent] = useState(null)

    let context = JSON.parse(localStorage.getItem('context'))
    let actionURL = `http://localhost:5156/api/ApplicationUpload/${context.user.user_id}`

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
                        <form action={actionURL} method="post" enctype="multipart/form-data" onSubmit={(event) => {
                            setAppContent('loading')
                            handleOnSubmit(event, setAppContent)
                        }}>
                            <div className='row'>
                                <div className='col'>
                                    <h6>Resume:</h6>
                                </div>
                                <div className='col'>
                                    <input id="file" name="resume" type="file" />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <h6>Cover Letter:</h6>
                                </div>
                                <div className='col'>
                                    <input id="file" name="coverLetter" type="file" />
                                </div>
                            </div>
                            <button>Upload</button>
                        </form>
                    </div>
                </div>
            </div>
            <>{renderSubmissionPreview(appContent)}</>
        </div>
    )
}

export default ApplyToPostingParentComponent