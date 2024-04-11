import {React, useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import NavBar from '../Components/NavBar'
import ApplyToPostingParentComponent from '../Components/ApplyToPostingParentComponent'


const ApplyToPostingPage = () => {
    let location = useLocation()
    let state = location.state
    console.log(state)
    return (
        <div className='parentPageContainer'>
            <NavBar/>
            <ApplyToPostingParentComponent company={state.company} posting={state.posting}/>
        </div>
    )
}

export default ApplyToPostingPage