import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'
import logo from '../Assets/coffeeLogo.png'

import axios from 'axios';

const handleSignUp = (event, companyName, setRefresh) => {
    event.preventDefault()
    axios.post('http://localhost:5156/api/Company', {
        name: companyName,
    }).then(res => {
        if(res.data && res.data.name == companyName) {
            // Create Login Credentials
            let context = JSON.parse(localStorage.getItem('context'))
            if(context != null) {
                context.company = res.data
                localStorage.setItem('context', JSON.stringify(context))
            }
            //Create Employee Record
            axios.post('http://localhost:5156/api/Company_Employee', {
                company_id: res.data.company_id,
                user_id: context.user.user_id
            })
            .then(res2 => {
                if(res2.data && res2.data.company_id == res.data.company_id) {
                    alert("Company Created Successfully")
                    setRefresh(true)
                }
                else {
                    alert(res2.data.company_id)
                }
            })
            .catch(err => {
                console.log(err)
                alert("Error Creating Employee Record")
            })
        }
        else {
            alert(res.data.name)
        }
    }).catch(err => {
        alert('Error Creating Company')
    })
}

const CreateCompany = () => {
    const [companyName, setCompanyName] = useState('')
    const [refresh, setRefresh] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        if(refresh) {
            setRefresh(false)
            let context = JSON.parse(localStorage.getItem('context'))
            if(context?.company != null) {
                navigate('/home')
            }
        }
    })

    return (
        <div className='loginComponentContainer'>
            <h1>Create Company</h1>
            <label for="InputEmail" class="form-label">Company Name:</label>
            <input type="text" class="form-control" id="InputEmail" required onChange={(event) => {
                setCompanyName(event.target.value)
            }}/>

            <button className='btn btn-primary' onClick={(event) => {
                handleSignUp(event, companyName, setRefresh)
            }}>Create</button>
        </div>
    );
}

export default CreateCompany