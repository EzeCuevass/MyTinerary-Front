import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import { useEffect } from "react";
import { Link as LinkRouter } from "react-router-dom" 
import "../styles/details.css"
import citiesActions from "../redux/actions/citiesActions";
import {useDispatch, useSelector} from "react-redux" 
import itinerariesActions from "../redux/actions/itinerariesActions"
import Itineraries from "./Itineraries";

function Details(){
    const [inputValue, setInputValue] = useState("")
    const {id} = useParams()
    // const [card, setCard] = useState([])
    const dispatch = useDispatch()
    useEffect(() => { 
            dispatch(citiesActions.getOneCity(id))
    }, [])
    const card = useSelector(store=>store.citiesReducer.city)
    return(
        <>
        <div className="body-details">
            <div className="card-container">
                <div className="card">
                    <div className="image-details">
                        <img className="image-card-details" src= {card.photo} alt="cities" />
                    </div>
                    <div className="data-body">
                        <h2>{card.cityname}</h2>
                        <h3>{card.country}</h3>
                        <LinkRouter to={"/cities"}>
                            <button className="button-details">Go Back!</button>
                        </LinkRouter>
                    </div>
                </div>
            </div>
        </div>
        <Itineraries cityid={id}/>
        </>
    );
};
export default Details