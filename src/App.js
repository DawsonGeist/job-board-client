import logo from './logo.svg';
import './App.css';
import { React, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import Home from './Pages/home';
import CreateCompanyPage from './Pages/CreateCompanyPage';
import CreateJobPostingPage from './Pages/CreateJobPostingPage';
import ViewApplicationsPage from './Pages/ViewApplicationsPage';
import UserApplicationsPage from './Pages/UserApplicationsPage';
import ApplyToPostingPage from './Pages/ApplyToPostingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/createCompany' element={<CreateCompanyPage/>}/>
        <Route path='/createJobPosting' element={<CreateJobPostingPage/>}/>
        <Route path='/ViewApplications' element={<ViewApplicationsPage/>}/>
        <Route path='/MyApplications' element={<UserApplicationsPage/>}/>
        <Route path='/Apply' element={<ApplyToPostingPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
