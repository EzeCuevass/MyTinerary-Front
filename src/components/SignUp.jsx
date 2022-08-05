import React, {useState} from "react";
import userActions from "../redux/actions/userActions";
import { connect } from "react-redux"
import TextField from '@mui/material/TextField';
import GoogleSignUp from "./gSignup";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


import "../styles/signup.css"
function SignUp(props){
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [country, setCountry] = useState("")
    const [photo, setPhoto] = useState("")
    var countries = ["", "Argentina", "Bolivia","Brasil", "Chile", "Colombia", "Ecuador", "Peru", "Paraguay", "Venezuela", "Uruguay"]
    
    const handleSubmit = (event) => {
        event.preventDefault()
        const userData = {
            fullname: fullname,
            email: email,
            password: password,
            country: country,
            photo: photo,
            from: "form-Signup",
        }    
    props.signUp(userData)
}
    return(
        <>
        <div className="form-div">
            <form onSubmit={handleSubmit}>
                <TextField className="textfield element-form" type="text" id="filled-basic fullname" label="Full name" variant="filled" name="fullname" itemID="fullname" value={fullname} onChange={e=>setFullname(e.target.value)} required/>
                <TextField className="textfield element-form" type="text" id="filled-basic email" label="Email" variant="filled" name="email" itemID="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
                <TextField className="textfield element-form" type="text" id="filled-basic password" label="Password" variant="filled" name="password" itemID="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
                <Select className="select-forms element-form" name="country" id="country" onChange={e=>setCountry(e.target.value)} required>
                    {countries.map( everyCountry =>
                        <MenuItem key={everyCountry} value={everyCountry}>{everyCountry}</MenuItem>)}
                </Select>
                <TextField className="textfield element-form" type="text" id="filled-basic photo" label="Photo" variant="filled" name="photo" itemID="photo" value={photo} onChange={e=>setPhoto(e.target.value)} required/>
                <button className="element-form buttons" type="submit">Sign up</button>
                <GoogleSignUp className="element-form buttons"/>
            </form>
        </div>
        </>
    )
}
const mapDispatchToProps = {
    signUp: userActions.signUp
}
const mapStateToProps = (state) => {
    return {
        message: state.userReducer.message
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (SignUp)