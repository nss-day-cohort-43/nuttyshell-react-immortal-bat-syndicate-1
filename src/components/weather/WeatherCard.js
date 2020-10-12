import React from "react";
import "./Weather.css"


export const WeatherCard = ( {weather, temp} ) => {
    
    let date = weather.dt_txt
    let today = false
    if (date?.split(" ")[0] === new Date().toISOString().split("T")[0]) { today = true }
         return (
        <>
      <section className="Weather">
    <h3>Weather For {date}</h3>
      <div> {temp.temp} degrees </div>
      <div> {weather.pop * 100}% chance of rain </div><p></p>
      <div> {today ? "Sorry, can not predict the weather out that far. Today's weather has been provided instead." : ""} </div>
      </section>

      </>
    );
  };
