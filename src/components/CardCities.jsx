import * as React from 'react';
import "../styles/cards.css"
import {Link as LinkRouter} from "react-router-dom"
function CardCities({cardFilter}){
    return (
        <>
        <div className='cards-container'>
        {cardFilter.map(city => (
            <div className='cards' key={city._id}>
                <div className='image'>
                    <LinkRouter to={`citydetails/${city._id}`}>
                        <img src = {city.photo}  alt="cities" className='image-card'/>
                    </LinkRouter>
                </div>
                <div className='body-card'>
                    <h3>{city.cityname}</h3>
                    <h4>{city.country}</h4>
                    <LinkRouter to={`citydetails/${city._id}`}>
                        See more
                    </LinkRouter>
                </div>
            </div>
        ))}
        </div>
        </>
    )
}
export default CardCities 