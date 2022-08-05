import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import data from "../data.json"
import "../styles/slider.css";
import "swiper/css/navigation"

// import required modules
import { Autoplay, Navigation, Grid, Pagination } from "swiper";

export default function Slider() {
  return (
    <>
      <div className="background-swiper">
      <h1>Popular MYtineraries</h1>
      <Swiper
        slidesPerGroup={2}
        slidesPerView={2}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        grid={{
          rows: 2,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination, Autoplay, Navigation]}
        className="mySwiper"
      >
        { data.map(destinos =>{ 
            return(
            <SwiperSlide className= "mySwiper" key={destinos.id} style={{backgroundImage:`url("${destinos.image}")`, backgroundSize:"cover", backgroundPosition:"center"}}> 
              <div>
                <p className="beaches-text">{destinos.name}</p>
                <p className="beaches-text">{destinos.city}</p>
              </div>
            </SwiperSlide>
        )})
        }
      </Swiper>
      </div>
    </>
  );
}
