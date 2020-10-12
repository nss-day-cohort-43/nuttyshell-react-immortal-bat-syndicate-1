import React from "react";
import "./Weather.css"

export const WeatherCard = ( {weather, temp, key} ) => {
    let date =  weather.dt_txt
         return (
        <>
      <section className="Weather">
    <h3>Weather For {date}</h3>
      <div> {temp.temp} degrees </div>
      <div> {weather.pop}% chance of rain </div>
      </section>
      </>
    );
  };
