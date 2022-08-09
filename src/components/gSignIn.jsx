import React, { useEffect } from 'react'
import jwt_decode from "jwt-decode"
import { useDispatch } from "react-redux"
import userActions from '../redux/actions/userActions'
import { useNavigate } from "react-router-dom"

function GoogleSignIn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function handleCallback(res){
        // console.log(res);
        const userObject = jwt_decode(res.credential)
        // console.log(userObject)
        let response = await dispatch(userActions.signIn({
            email: userObject.email,
            password: userObject.sub,
            from: "Google Sign In"
        }))
        // console.log(response);
        if(response.data.success){
            navigate("/")
        }
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