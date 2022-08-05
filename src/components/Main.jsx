import React from "react";
import Slider from './Slider';
import Banner from './Banner';
import Hero from './Hero';
import "../styles/App.css"
function Main(){
    return(
        <div className="main">
            <Banner />
            <Hero />
            <Slider />
        </div>
    )
}
export default Main