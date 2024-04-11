import logo from '../Assets/coffeeLogo.png'
import profileIcon from '../Assets/profileIcon.png'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap'

import { React, useState, useEffect } from 'react'

const renderHeader = (context) => {
    if(context.company != null) {
        return (
            <ul className='navbar-nav'>
                <li className='nav-item'><a class="nav-link active" href="/home">Home</a></li>
                <li className='nav-item'><a class="nav-link" href="/MyApplications">Applications</a></li>
                <li className='nav-item'><a class="nav-link" href="#">Find Salary</a></li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Company
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Company Page (TODO)</a></li>
                        <li><hr class="dropdown-divider"/></li>
                        <li><a class="dropdown-item" href="/createJobPosting">Create Job Posting</a></li>
                        <li><a class="dropdown-item" href="/ViewApplications">View Applications</a></li>
                    </ul>
                </li>
                <li className='nav-item'><a class="nav-link" href="/" onClick={() => {
                    localStorage.clear();
                }}>Logout</a></li>
            </ul>
        );

    }
    else {
        return (
            <ul className='navbar-nav'>
                <li className='nav-item'><a class="nav-link active" href="#">Home</a></li>
                <li className='nav-item'><a class="nav-link" href="#">Jobs</a></li>
                <li className='nav-item'><a class="nav-link" href="#">Find Salary</a></li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Company
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/createCompany">Create Company</a></li>
                        <li><a class="dropdown-item" href="#">Company Page</a></li>
                        <li><hr class="dropdown-divider"/></li>
                        <li><a class="dropdown-item" href="#">Create Job Posting</a></li>
                    </ul>
                </li>
                <li className='nav-item'><a class="nav-link" href="/" onClick={() => {
                    localStorage.clear();
                }}>Logout</a></li>
            </ul>
        );
    }
}

const NavBar = () => {
    let context = JSON.parse(localStorage.getItem('context'))
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <div className='d-inline-block d-flex flex-row'>
                    <a class="navbar-brand" id="NavbarLogoAnchor" href="/home">
                        <img src={logo} width="30" height="30" class="d-inline-block align-center" id='NavbarLogoImg' alt=""/>
                        <p id="NavbarBrandText">Java Jobs</p>
                    </a>
                </div>
                <button class="navbar-toggler align-flex-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse align-flex-end" id="navbarSupportedContent">
                    <ul className='navbar-nav'>{
                        renderHeader(context)
                    }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar