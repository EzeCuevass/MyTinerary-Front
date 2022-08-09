import React, { useState } from "react";
import userActions from "../redux/actions/userActions"
import { useDispatch } from "react-redux"
import TextField from '@mui/material/TextField';
import GoogleSignIn from "./gSignIn";
import "../styles/signup.css"
import { useNavigate } from "react-router-dom";

function SignIn(props){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async (event) => {
        event.preventDefault()
        const logedUser = {
            email: email,
            password: password,
            from: "form-Signin",
        }
        let res = await dispatch(userActions.signIn(logedUser))
        if(res.data.success){
            navigate("/")
        }
    }
    
    return(
        <div className="form-div">
            <form onSubmit={handleSubmit}>
                <TextField className="textfield element-form" type="text" id="filled-basic email" label="Email" variant="filled" name="email" itemID="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
                <TextField className="textfield element-form" type="password" id="filled-basic password" label="Password" variant="filled" name="password" itemID="Password" value={password} onChange={e=>setPassword(e.target.value)} required/>
                <button className="element-form buttons" type="submit">Sign In</button>
                <GoogleSignIn className="element-form buttons"/>
            </form>
        </div>
    )
}

export default SignIn
