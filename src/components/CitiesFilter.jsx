import React, { useState } from "react";
import CardCities from "./CardCities";
import Error from "./Error"
import TextField from '@mui/material/TextField';
// import axios from "axios";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux" 
import citiesActions from "../redux/actions/citiesActions"
import "../styles/citiesfilter.css"
function Cities(){
    const [inputValue, setInputValue] = useState("") 
    const dispatch = useDispatch() 
    useEffect(()=>{
        dispatch(citiesActions.getCities())
        dispatch(citiesActions.filterCities(inputValue))
    }, [inputValue])
    const citiesfilter = useSelector(store=>store.citiesReducer.filterCity) 
    console.log(citiesfilter);
    return (
        <>
        <div className="cities-first-box">
            <h2 className="title-cities">Let´s explore the world!</h2>
            <TextField id="outlined-basic" label="Search" variant="outlined" onKeyUp={(event) => setInputValue(event.target.value)}/>
        </div>
        <div className="cities-container">
            {citiesfilter?.length> 0 ? (<CardCities cardFilter={citiesfilter} />) : (<Error />)}
        </div>
        </>
    )
    
}
export default Cities