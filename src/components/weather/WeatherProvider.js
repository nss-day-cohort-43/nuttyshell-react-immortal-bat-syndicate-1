import React, { useState, createContext } from "react";
import api from "../Settings.js";

export const WeatherContext = createContext();

export const WeatherProvider = (props) => {
  const [weather, setWeather] = useState([]);

  const getWeather = (object) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?zip=${object.zip},us&units=imperial&appid=${api.weatherKey}`
    )
      .then((response) => response.json())
      .then(setWeather);
  };

  //gets weather from openweather API in imperial units at given coordinates and assigns it to the weather variable
  const getCurrentWeather = (locationObj) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${locationObj.coords.latitude}&lon=${locationObj.coords.longitude}&units=imperial&cnt=8&appid=${api.weatherKey}`
    )
      .then((response) => response.json())
      .then(setWeather);
  };
  return (
    <WeatherContext.Provider
      value={{
        weather,
        getCurrentWeather,
        getWeather,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};
