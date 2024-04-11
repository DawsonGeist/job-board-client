import { React, useState, useEffect } from 'react';
import '../styles.css'
import logo from '../Assets/coffeeLogo.png'

import CreateJobPosting from '../Components/CreateJobPosting';

const CreateJobPostingPage = () => {
    return (
        <div className='parentPageContainer'>
            <div className='d-flex flex-row justify-content-center'>
                <img src={logo} width='50' height='50'/>
                <h1 style={{color:'brown'}}>Java Jobs</h1>
            </div>
            <div className='d-flex flex-column justify-content-center flex-grow' id='loginPageLoginComponentContainer'>
                <CreateJobPosting/>
            </div>
        </div>
    );
}

export default CreateJobPostingPage