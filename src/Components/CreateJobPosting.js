import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'
import logo from '../Assets/coffeeLogo.png'
import axios from 'axios';

const convertAddressIntoUrlParameter = (street, city, state, zip) => {
    let address = `${street.replaceAll(' ', '+')},+${city.replaceAll(' ', '+')},+${state.replaceAll(' ', '+')},+${zip}`
    console.log(address)
    return address
}

const handleCreateJobPosting = (event, company_id, job_title, desc, address, is_active, setRefresh, setSuccess) => {
    event.preventDefault()
    // Get Address Coordinates:
    //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=`)
    .then(res => {
        console.log(res)
    })
    //
    
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

    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')

    const navigate = useNavigate();
    
    let context = JSON.parse(localStorage.getItem('context'))

    useEffect(() => {
        if(refresh) {
            convertAddressIntoUrlParameter('1 W kenmar rd', 'Menands', 'NY', '12204')
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
            <label for="InputPass" class="form-label">Street:</label>
            <input type="text" class="form-control" id="InputPass" required onChange={(event) => {
                setStreet(event.target.value)
            }}/>
            <label for="InputPass" class="form-label">City:</label>
            <input type="text" class="form-control" id="InputPass" required onChange={(event) => {
                setCity(event.target.value)
            }}/>
            <label for="InputPass" class="form-label">State:</label>
            <input type="text" class="form-control" id="InputPass" required onChange={(event) => {
                setState(event.target.value)
            }}/>
            <label for="InputPass" class="form-label">Zip Code:</label>
            <input type="text" class="form-control" id="InputPass" required onChange={(event) => {
                setZip(event.target.value)
            }}/>
            <button className='btn btn-primary' onClick={(event) => {
                console.log('Create Job Posting')
                let address = convertAddressIntoUrlParameter(street, city, state, zip)
                handleCreateJobPosting(event, context.company.company_id, title, desc, address, is_active, setRefresh, setSuccess)
            }}>Create</button>
        </div>
    );
}

export default CreateJobPosting