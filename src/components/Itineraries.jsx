import React, { useEffect, useState } from "react";
import itinerariesActions from "../redux/actions/itinerariesActions";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";

import "../styles/itineraries.css"

import "../styles/activities.css"
import CardItineararies from "./CardItineraries";





function Itineraries({cityid}){    
    const dispatch = useDispatch()

    const itinerary = useSelector(store=>store.itinerariesReducer.itinerary)
    let {id} = useParams()    
    // console.log(itinerary);
    // user && 
    // console.log(user.id);
    useEffect(()=>{
        dispatch(itinerariesActions.findTinFromCity(id))
    },[])
    
    
    return(
            <div className="itineraries-container">
                {itinerary.length>0?
                itinerary.map(itinerary=>(
                <CardItineararies itinerary={itinerary} cityid={cityid} key={itinerary._id} />
            )): <div className="error-message">
                    <p className="noitineraries">No itineraries available</p>
                </div>
            }
            </div>
    )
}
export default Itineraries