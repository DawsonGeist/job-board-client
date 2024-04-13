import {React, useState, useEffect} from 'react'
import axios from 'axios'
import EditEducationComponent from './EditEducationComponent'
import EditWorkExperience from './EditWorkExperienceComponent'


const renderSubmissionPreview = (appContent) => {
    if(appContent != null && appContent != "loading") {
        console.log(appContent.Education_History)
        return (
            <div className='container Resume'>
                <br/>
                <h4>Education</h4>
                <div className='d-flex flex-column'>{appContent.Education_History.map((school, index) => {
                    return (
                        <EditEducationComponent Education={school} index={index}/>
                    );
                })}</div>
                

                <br/>
                <h4>Work Experience</h4>
                <div>{appContent.Work_History.map((job, index) => {
                    console.log(job)
                    return (<EditWorkExperience Job={job} index={index}/>);
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

    //Dont want to use all my OpenAI Calls. Read object from file instead
    var content = "{\n    \"Personal_Summary\": \"Founder of sustainability consulting firm with an aim at building sustainable communities and businesses. Develops energy efficiency programs, Environmental Management Systems, conducts sustainability audits and provides other consulting services that helps build a company's triple bottom line.\",\n    \"Relevant_Skills\": [\n        \"Sustainability Consulting\",\n        \"Energy Efficiency Programs\",\n        \"Environmental Management Systems\",\n        \"Sustainability Audits\",\n        \"Green Business Development\",\n        \"Educational Programs Development\",\n        \"Legal Consulting\",\n        \"Litigation Analysis\",\n        \"Contract Negotiation\",\n        \"Policy Review and Recommendations\"\n    ],\n    \"Education_History\": [\n        {\n            \"Degree\": \"Master of Environmental Studies\",\n            \"Subject\": \"Environmental Policy and Sustainability\",\n            \"Graduation_Date\": \"May 2010 (Expected)\",\n            \"University\": \"University of Pennsylvania\"\n        },\n        {\n            \"Degree\": \"J.D.\",\n            \"Subject\": \"Law\",\n            \"Graduation_Date\": \"January 2001\",\n            \"University\": \"Temple University\"\n        },\n        {\n            \"Degree\": \"B.A.\",\n            \"Subject\": \"Psychology and History\",\n            \"Graduation_Date\": \"May 1995\",\n            \"University\": \"Dickinson College\"\n        }\n    ],\n    \"Work_History\": [\n        {\n            \"Title\": \"President and CEO\",\n            \"Company\": \"Guaranteed Sun, LLC\",\n            \"Dates\": \"November 2008 - Present\",\n            \"Responsibilities\": [\n                \"Developed sustainability platforms for green business communities.\",\n                \"Provided analysis of existing green business programs for an environmental NGO called Sustainable Cherry Hill.\",\n                \"Developed green business, sustainability and environmental educational programs.\"\n            ]\n        },\n        {\n            \"Title\": \"Watershed Ambassador\",\n            \"Company\": \"New Jersey AmeriCorps Watershed Ambassador Program\",\n            \"Dates\": \"September 2007 - August 2008\",\n            \"Responsibilities\": [\n                \"Administered fieldwork and environmental educational programs within the Rancocas Creek Watershed.\",\n                \"Facilitated stream monitoring training and partnership programs.\"\n            ]\n        },\n        {\n            \"Title\": \"Associate Attorney\",\n            \"Company\": \"Dickie, McCamey & Chilcote, P.C.\",\n            \"Dates\": \"September 2006 - August 2007\",\n            \"Responsibilities\": [\n                \"Provided legal consulting in tort cases.\",\n                \"Strengthened clients' cases through aggressive discovery and legal analysis.\"\n            ]\n        },\n        {\n            \"Title\": \"Associate Attorney\",\n            \"Company\": \"McCarter & English, LLP\",\n            \"Dates\": \"February 2004 - August 2006\",\n            \"Responsibilities\": [\n                \"Provided legal consulting for Fortune 500 corporations in complex commercial litigation and environmental disputes.\",\n                \"Supervised work of legal staff on major projects.\"\n            ]\n        },\n        {\n            \"Title\": \"Deputy Attorney General\",\n            \"Company\": \"New Jersey Attorney General's Office\",\n            \"Dates\": \"March 2001 - February 2004\",\n            \"Responsibilities\": [\n                \"Provided legal consulting to state agencies on a variety of issues including environmental law, tobacco litigation and health care cases.\",\n                \"Reviewed and provided recommendations for pending legislation and contractual arrangements.\"\n            ]\n        },\n        {\n            \"Title\": \"Test Control Officer (Captain) (1998-2000)\",\n            \"Company\": \"United States Army\",\n            \"Dates\": \"August 1996 - August 2000\",\n            \"Responsibilities\": [\n                \"Reviewed contracts, planned, organized and led relocation team resulting in 50% savings of time and resources.\",\n                \"Implemented training program that improved testing section's performance and morale, which resulted in section improving from last to first place in less than six months.\",\n                \"Developed budget program which had a 100% compliance rating with financial regulations.\"\n            ]\n        }\n    ],\n    \"Volunteer_History\": [\n        {\n            \"Title\": \"Cleanup Organizer\",\n            \"Company\": \"Rancocas State Park\",\n            \"Dates\": \"Awarded in the position\",\n            \"Responsibilities\": [\n                \"Organized a cleanup involving about 100 volunteers resulting in almost 50 tons of debris being removed from the park.\"\n            ]\n        }\n    ],\n    \"Personal_Projects\": [],\n    \"Awards\": [\n        {\n            \"Title\": \"Award for organizing a cleanup of the Rancocas State Park\",\n            \"Dates\": \"Received during the volunteer position\",\n            \"Description\": \"Involved about 100 volunteers and resulted in almost 50 tons of debris being removed from the park.\"\n        },\n        {\n            \"Title\": \"Secured over $250 million from major tobacco companies\",\n            \"Dates\": \"During the tenure\",\n            \"Description\": \"Through legal consulting and enforcement efforts.\"\n        },\n        {\n            \"Title\": \"Won appeal with low chance of success\",\n            \"Dates\": \"During the tenure\",\n            \"Description\": \"Commended for winning an appeal that had low chance of success.\"\n        }\n    ]\n}" 
    //console.log(JSON.parse(content))
    setAppContent(JSON.parse(content))
    // fetch(url, fetchOptions).then(res => {
    //     //console.log(res)
    //     res.body.getReader().read().then(content => {
    //         var dc = new TextDecoder()
    //         var y = dc.decode(content.value)
    //         //console.log(y)
    //         var x = JSON.parse(y)
    //         console.log(x)
    //         var response = JSON.parse((x[0]).resume)
    //         var sectionsStr = (response.choices[0]).message.content
    //         //console.log(sectionsStr)
    //         var sections = JSON.parse(sectionsStr)
    //         console.log('SECTIONS:')
    //         console.log(sections)
    //         setAppContent(sections)
    //     })
    //     alert(`File Upload Status: ${res.statusText}`)
    // })
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
                            handleOnSubmit(event, setAppContent) // Dont want to use up my open ai credit
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