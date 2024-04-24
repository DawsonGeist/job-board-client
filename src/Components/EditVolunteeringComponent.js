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
            <div className='row'>
                <div className='col'>
                    <div className='form-group'>
                        <label style={{display:"flex"}}>From:</label>
                        <input className="form-control" type='text' value={dates}/>
                    </div>
                </div>
                <div className='col'>
                    <div className='form-group'>
                        <label style={{display:"flex"}}>To:</label>
                        <input className="form-control" type='text' value={"Present"}/>
                    </div>
                </div>
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

const EditVolunteeringComponent = ({Volunteer, index}) => {
    index = index + 1
    let header = `Volunteering ${index}`
    return (
        <div className='d-flex flex-column mt-4'>
            <h5 style={{alignSelf:"flex-start"}}>{header}</h5>
            <div>
                <div className='form-group'>
                    <label style={{display:"flex"}}>Title:</label>
                    <input className="form-control" type='text' value={Volunteer.Title} style={{width:"100%"}}></input>
                </div>
                <div className='form-group'>
                    <label style={{display:"flex"}}>Organization:</label>
                    <input className="form-control" type='text' value={Volunteer.Company}></input>
                </div>
                <>{RenderDates(Volunteer.Dates)}</>
                <>{RenderResponsibilities(Volunteer.Responsibilities)}</>
            </div>
        </div>
    )
}

export default EditVolunteeringComponent;