import {React, useState, useEffect} from 'react'
import axios from 'axios'

const RenderDates = (DateString) => {
    console.log(DateString)
    var dates = DateString.split("-")
    console.log(dates)
    if(dates.length == 2) {
        var fromDate = dates[0]
        var toDate = dates[1]
        return (
            <div className='row'>
                <div className='col'>
                    <div className='form-group'>
                        <label style={{display:"flex"}}>From:</label>
                        <input className="form-control" type='text' value={fromDate}/>
                    </div>
                </div>
                <div className='col'>
                    <div className='form-group'>
                        <label style={{display:"flex"}}>To:</label>
                        <input className="form-control" type='text' value={toDate}/>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='form-group'>
                <label style={{display:"flex"}}>Graduated:</label>
                <input className="form-control" type='text' value={DateString}/>
            </div>
        )
    }
}

const RenderResponsibilities = (Responsibilities) => {
    return (
        <div className='d-flex flex-column mt-4'>
            <h6 style={{alignSelf:"flex-start"}}>Responsibilities</h6>
            <div className='form-group'>{Responsibilities.map((responsibility, index) => {
                let label = `Function ${index+1}`
                return (
                    <>
                        <label style={{display:"flex"}}>{label}</label>
                        <input className="form-control" type='text' value={responsibility}/>
                    </>
                )
            })}</div>
        </div>
    )
}

const EditWorkExperience = ({Job, index}) => {
    index = index + 1
    let header = `Job ${index}`
    return (
        <div className='d-flex flex-column mt-4'>
            <h5 style={{alignSelf:"flex-start"}}>{header}</h5>
            <form>
                <div className='form-group'>
                    <label style={{display:"flex"}}>Title:</label>
                    <input className="form-control" type='text' value={Job.Title} style={{width:"100%"}}></input>
                </div>
                <div className='form-group'>
                    <label style={{display:"flex"}}>Company:</label>
                    <input className="form-control" type='text' value={Job.Company}></input>
                </div>
                <>{RenderDates(Job.Dates)}</>
                <>{RenderResponsibilities(Job.Responsibilities)}</>
            </form>
        </div>
    )
}

export default EditWorkExperience;