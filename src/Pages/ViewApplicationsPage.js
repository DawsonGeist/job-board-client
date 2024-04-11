import { React, useState, useEffect } from 'react';
import '../styles.css'

import NavBar from '../Components/NavBar';
import ViewApplicationsComponent from '../Components/ViewApplicationsComponent';

const ViewApplicationsPage = () => {

    return (
        <div className='parentPageContainer'>
            <NavBar/>
            <ViewApplicationsComponent/>
        </div>
    )
}

export default ViewApplicationsPage;