import {React, useState, useEffect} from 'react'
import axios from 'axios'


const renderSubmissionPreview = (appContent) => {
    if(appContent != null && appContent != "loading") {
        return (
            <div className='container Resume'>
                <br/>
                <h4>Education</h4>
                <br/>
                <div>{appContent.Education_History.map(school => {
                    return (
                        <div className='container'> 
                            <br/>
                            <div className='row'>
                                <div className='col'>
                                    <p><b>Degree:</b></p>
                                </div>
                                <div className='col'>
                                    <input type='text' value={school.Degree}></input>
                                </div>
                            </div>
                            <br/>
                            <div className='row'>
                                <div className='col'>
                                    <p><b>Subject:</b></p>
                                </div>
                                <div className='col'>
                                    <input type='text' value={school.Subject}></input>
                                </div>
                            </div>
                            <br/>
                            <div className='row'>
                                <div className='col'>
                                    <p><b>University:</b></p>
                                </div>
                                <div className='col'>
                                    <input type='text' value={school.University}></input>
                                </div>
                            </div>
                            <br/>
                            <div className='row'>
                                <div className='col'>
                                    <p><b>Dates:</b></p>
                                </div>
                                <div className='col'>
                                    <input type='text' value={school.Graduation_Date}></input>
                                </div>
                            </div>
                        </div>
                    );
                })}</div>

                <h4>Work Experience</h4>
                <br/>
                <div>{appContent.Work_History.map(job => {
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
                <br/>
                <h4>Volunteering</h4>
                <br/>
                <div>{appContent.Volunteer_History.map(vol => {
                    return (
                        <div className='container'>
                            <div className='row'>
                                <div className='col'>
                                    <p><b>Title:</b></p>
                                </div>
                                <div className='col'>
                                    <input type='text' value={vol.Title}></input>
                                </div>
                            </div>
                            <br/>
                            <div className='row'>
                                <div className='col'>
                                    <p><b>Organization:</b></p>
                                </div>
                                <div className='col'>
                                    <input type='text' value={vol.Company}></input>
                                </div>
                            </div>
                            <br/>
                            <div className='row'>
                                <div className='col'>
                                    <p><b>Dates:</b></p>
                                </div>
                                <div className='col'>
                                    <input type='text' value={vol.Dates}></input>
                                </div>
                            </div>
                            <br/>
                            <div className='row'>
                                <div className='col'>
                                    <p><b>Responsibilities:</b></p>
                                </div>
                                <div className='col'>
                                    <input type='text' value={vol.Responsibilities}></input>
                                </div>
                            </div>
                        </div>
                    );
                })}</div>
                <br/>
                <h4>Personal Projects</h4>
                <br/>
                <div>{appContent.Personal_Projects.map(proj => {
                    return (
                        <div className='container'>
                            <div className='row'>
                                <div className='col'>
                                    <p><b>Title:</b></p>
                                </div>
                                <div className='col'>
                                    <input type='text' value={proj.Title}></input>
                                </div>
                            </div>
                            <br/>
                            <div className='row'>
                                <div className='col'>
                                    <p><b>Dates:</b></p>
                                </div>
                                <div className='col'>
                                    <input type='text' value={proj.Dates}></input>
                                </div>
                            </div>
                            <br/>
                            <div className='row'>
                                <div className='col'>
                                    <p><b>Description:</b></p>
                                </div>
                                <div className='col'>
                                    <input type='text' value={proj.Description}></input>
                                </div>
                            </div>
                        </div>
                    );
                })}</div>
                <br/>
                <h4>Awards</h4>
                <br/>
                <div>{appContent.Awards?.map(award => {
                    return (
                        <div className='container'>
                            <div className='row'>
                                <div className='col'>
                                    <p><b>Title:</b></p>
                                </div>
                                <div className='col'>
                                    <input type='text' value={award.Title}></input>
                                </div>
                            </div>
                            <br/>
                            <div className='row'>
                                <div className='col'>
                                    <p><b>Dates:</b></p>
                                </div>
                                <div className='col'>
                                    <input type='text' value={award.Dates}></input>
                                </div>
                            </div>
                            <br/>
                            <div className='row'>
                                <div className='col'>
                                    <p><b>Description:</b></p>
                                </div>
                                <div className='col'>
                                    <input type='text' value={award.Description}></input>
                                </div>
                            </div>
                            <br/>
                        </div>
                    );
                })}</div>
                <br/>
                <h4>Skills</h4>
                <br/>
                <div>{appContent.Relevant_Skills?.map(skill => {
                    return (
                        <p>{skill}</p>
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
            console.log('SECTIONS:')
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