import { React, useState, useEffect } from 'react';
import '../styles.css'

import NavBar from '../Components/NavBar';
import UserApplicationsParentComponent from '../Components/UserApplicationsParentContainer';

const UserApplicationsPage = () => {

    return (
        <div className='parentPageContainer'>
            <NavBar/>
            <UserApplicationsParentComponent/>
        </div>
    )
}

export default UserApplicationsPage;