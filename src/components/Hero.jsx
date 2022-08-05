import React from "react";
import "../styles/button.css"
import {Link as LinkRouter} from "react-router-dom"
function button(){
    return(
        <div className="button-background">
            <h3 className="text-hero">Click here to see our Cities</h3>
            <LinkRouter to={"/cities"}><button className="button-hero">CLICK HERE!</button></LinkRouter>
        </div>
    )
}
export default button