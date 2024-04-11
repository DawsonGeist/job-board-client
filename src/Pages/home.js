import { React, useState, useEffect } from 'react';
import '../styles.css'

import NavBar from '../Components/NavBar';
import WeatherModule from '../Components/WeatherModule';
import JobFeed from '../Components/JobFeed';

const Home = () => {

    return (
        <div className='parentPageContainer'>
            <NavBar/>
            <JobFeed/>
        </div>
    )
}

export default Home;