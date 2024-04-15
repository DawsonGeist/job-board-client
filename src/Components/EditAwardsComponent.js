import {React, useState, useEffect} from 'react'
import axios from 'axios'

const RenderDates = (DateString) => {
    return (
        <div className='form-group'>
            <label style={{display:"flex"}}>Awarded:</label>
            <input className="form-control" type='text' value={DateString}/>
        </div>
    )
}

const EditAwardsComponent = ({Award, index}) => {
    index = index + 1
    let header = `Award ${index}`
    return (
        <div className='d-flex flex-column mt-4'>
            <h5 style={{alignSelf:"flex-start"}}>{header}</h5>
            <div>
                <div className='form-group'>
                    <label style={{display:"flex"}}>Title:</label>
                    <input className="form-control" type='text' value={Award.Title} style={{width:"100%"}}></input>
                </div>
                <>{RenderDates(Award.Dates)}</>
                <div className='form-group'>
                    <label style={{display:"flex"}}>Description:</label>
                    <input className="form-control" type='text' value={Award.Description}></input>
                </div>
            </div>
        </div>
    )
}

export default EditAwardsComponent;