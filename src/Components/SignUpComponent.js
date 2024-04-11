import { React, useState, useEffect } from 'react';
import '../styles.css'
import logo from '../Assets/coffeeLogo.png'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const handleSignUp = (event, fname, lname, email, phone, pass, setRefresh, setSuccess) => {
    event.preventDefault()
    axios.post('http://localhost:5156/api/User', {
        first_name: fname,
        last_name: lname,
        email: email,
        phone: phone,
    }).then(res => {
        if(res.data && res.data.email == email) {
            // Create Login Credentials
            axios.post('http://localhost:5156/api/Login', {
                email: email,
                password: pass,
                user_id: res.data.user_id, 
            }).then(res2 => {
                if(res2.data) {
                    alert(`User ${res.data.first_name} Created (${res.data.user_id})`)
                    // Navigate to Login Page
                    setRefresh(true)
                    setSuccess(true)
                }
            }).catch(err => {
                alert('Error Creating Login Credentials')
            })
        }
        else {
            alert(res.data.email)
        }
    }).catch(err => {
        alert('Error Creating User')
    })
}

const SignUpComponent = () => {
    const [email, setEmail] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [phone, setPhone] = useState('')
    const [pass, setPass] = useState('')
    const [refresh, setRefresh] = useState(true)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate();
    
    useEffect(() => {
        if(refresh) {
            setRefresh(false)
            if (success) {
                navigate('../')
            }
        }
    })
    

    return (
        <div className='loginComponentContainer'>
            <h1>Sign Up</h1>
            <label for="InputEmail" class="form-label">First Name:</label>
            <input type="text" class="form-control" id="InputEmail" required onChange={(event) => {
                setFname(event.target.value)
            }}/>
            <label for="InputEmail" class="form-label">Last Name:</label>
            <input type="text" class="form-control" id="InputEmail" required onChange={(event) => {
                setLname(event.target.value)
            }}/>
            
            <label for="InputEmail" class="form-label">Email:</label>
            <input type="text" class="form-control" id="InputEmail" required onChange={(event) => {
                setEmail(event.target.value)
            }}/>
            
            <label for="InputEmail" class="form-label">Phone:</label>
            <input type="text" class="form-control" id="InputEmail" required onChange={(event) => {
                setPhone(event.target.value)
            }}/>
            
            <label for="InputPass" class="form-label">Password:</label>
            <input type="text" class="form-control" id="InputPass" required onChange={(event) => {
                setPass(event.target.value)
            }}/>

            <button className='btn btn-primary' onClick={(event) => {
                handleSignUp(event, fname, lname, email, phone, pass, setRefresh, setSuccess)
            }}>Create</button>

            <div style={{paddingTop:'1%'}}>
                <p>Have an account? <a href='/'>Sign in</a></p>
            </div>
        </div>
    );
}

export default SignUpComponent