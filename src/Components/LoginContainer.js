import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'
import logo from '../Assets/coffeeLogo.png'
import axios from 'axios';

const handleLogin = (event, email, pass, setRefresh) => {
    event.preventDefault()
    axios.get(`http://localhost:5156/api/Login/${email}/${pass}`, {})
    .then(res => {
        if(res.data) {
            localStorage.setItem('context', JSON.stringify({
                user: res.data.user,
                company: res.data.company,
            }))
            // Navigate to Home page
            setRefresh(true)
        }
        else {
            alert('Invalid Credentials')
        }
    })
    .catch(err => {
        console.log(err)
        alert('Error when logging in')
    })
}

const LoginContainer = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [refresh, setRefresh] = useState(true)
    const navigate = useNavigate();
    
    useEffect(() => {
        if(refresh) {
            setRefresh(false)
            let context = JSON.parse(localStorage.getItem('context'))
            if (context?.user != null) {
                navigate('/home')
            }
        }
    })

    return (
        <div className='loginComponentContainer'>
            <h1>Sign In</h1>
            
            <label for="InputEmail" class="form-label">Email:</label>
            <input type="text" class="form-control" id="InputEmail" required onChange={(event) => {
                setEmail(event.target.value)
            }}/>
            
            <label for="InputPass" class="form-label">Password:</label>
            <input type="text" class="form-control" id="InputPass" required onChange={(event) => {
                setPass(event.target.value)
            }}/>
            <button className='btn btn-primary' onClick={(event) => {
                console.log('LOGIN')
                handleLogin(event, email, pass, setRefresh)
            }}>Login</button>

            <div style={{paddingTop:'1%'}}>
                <p>Don't have an account? <a href='/signup'>Sign up</a></p>
            </div>
        </div>
    );
}

export default LoginContainer