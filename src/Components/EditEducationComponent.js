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

const EditEducationComponent = ({Education, index}) => {
    index = index + 1
    let header = `Education ${index}`
    return (
        <div className='d-flex flex-column mt-4'>
            <h5 style={{alignSelf:"flex-start"}}>{header}</h5>
            <div>
                <div className='form-group'>
                    <label style={{display:"flex"}}>Degree:</label>
                    <input className="form-control" type='text' value={Education.Degree} style={{width:"100%"}}></input>
                </div>
                <div className='form-group'>
                    <label style={{display:"flex"}}>Subject:</label>
                    <input className="form-control" type='text' value={Education.Subject}></input>
                </div>
                <div className='form-group'>
                    <label style={{display:"flex"}}>University:</label>
                    <input className="form-control" type='text' value={Education.University}></input>
                </div>
                <>{RenderDates(Education.Graduation_Date)}</>
            </div>
        </div>
    )
}

export default EditEducationComponent;