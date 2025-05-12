import React, { useEffect } from 'react'
import jwt_decode from "jwt-decode"
import { useDispatch } from "react-redux"
import userActions from '../redux/actions/userActions'
import {useNavigate} from "react-router-dom"
function GoogleSignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function handleCallback(res){
        // console.log(res);
        const userObject = jwt_decode(res.credential)
        // console.log(userObject)
        let response = await dispatch(userActions.signUp({
            fullname: userObject.name,
            email: userObject.email,
            password: userObject.sub,
            country: "Argentina",
            photo: userObject.picture,
            from: "Google Sign Up"
        }))
        console.log(response);
        if(response.data.success){
            navigate("/signin")
        } else if (response.data.message==="You have done your sign up in this way, please sign in"){
            navigate("/signin")
        }
    }
    useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
        client_id: "720582080896-315clarihnbjgmcm0gpdc8j9p8uqtkcv.apps.googleusercontent.com",
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
export default GoogleSignUp