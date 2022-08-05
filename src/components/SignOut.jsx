import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import {Link as LinkRouter} from "react-router-dom"

import {useDispatch} from 'react-redux';
import userActions from '../redux/actions/userActions'



function SignOut() {
    const dispatch = useDispatch()
    function signOut(){
        dispatch(userActions.signOut())
    }
    return ( 
            <LinkRouter to={'/'}>
                <Typography onClick={signOut} textAlign="center">Log Out</Typography>
            </LinkRouter>
    )
}

export default SignOut