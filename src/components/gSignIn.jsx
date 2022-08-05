import React, { useEffect } from 'react'
import jwt_decode from "jwt-decode"
import { useDispatch } from "react-redux"
import userActions from '../redux/actions/userActions'

function GoogleSignIn() {
    const dispatch = useDispatch()

    async function handleCallback(res){
        // console.log(res);
        const userObject = jwt_decode(res.credential)
        console.log(userObject)
        dispatch(userActions.signIn({
            email: userObject.email,
            password: userObject.sub,
            from: "Google Sign In"
        }))
    }
    useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
        client_id: "802070442112-p8eqcc02hidtdhhprf04nrhem1d2mdek.apps.googleusercontent.com",
        callback: handleCallback
    })
    google.accounts.id.renderButton(
        document.getElementById("gButton"),
        { theme: "outline", size: "medium", text:'signup_with', locale:"en-IN" }
    )
    })
    return(
        <div>
            <div className="buttons" id='gButton'></div>
        </div>
    )
}
export default GoogleSignIn