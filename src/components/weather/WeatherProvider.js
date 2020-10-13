import React, { useState, createContext } from "react";
import api from "../../Settings.js";

export const WeatherContext = createContext();

export const WeatherProvider = (props) => {
  const [weather, setWeather] = useState([]);

  const getWeatherTemp = (object) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?zip=${object.zip},us&units=imperial&appid=${api.weatherKey}`
    )
      .then((response) => response.json())
      .then((res) => {
        let compare = object.date;
        let dates = res.list
        let dates2 = dates.filter(date => {
          const suff = date.dt_txt.split(" ")[1]
          return suff === "15:00:00"
        })
        const answer = dates2.find((date) => {
          const x = date.dt_txt.split(" ")[0];
          return x === compare
        });
        if (answer) { return answer.main }
        else { return dates[0].main }
      });
    // .then(setWeather);
  };
  const getWeatherPop = (object) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?zip=${object.zip},us&units=imperial&appid=${api.weatherKey}`
    )
      .then((response) => response.json())
      .then((res) => {
        let compare = object.date;
        let dates = res.list
        let dates2 = dates.filter(date => {
          const suff = date.dt_txt.split(" ")[1]
          return suff === "21:00:00"
        })
        const answer = dates2.find((date) => {
          const x = date.dt_txt.split(" ")[0];
          return x === compare
        });
        if (answer) { 
        let answer2 = answer
        answer2.found = true
          return answer2 
        }
        else { 
          let answer = dates[0]
          answer.found = false
        return answer
        }
        });
    // .then(setWeather);
  };
  //gets weather from openweather API in imperial units at given coordinates and assigns it to the weather variable
  const getCurrentWeather = (x=100,y=100) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${x}&lon=${y}&units=imperial&cnt=8&appid=${api.weatherKey}`
    )
      .then((response) => response.json())
      .then(res =>{ 
      let answer = res.list[0]
        answer.found = true 
        return answer
      })
      // .then(setWeather);
  };
  return (
    <WeatherContext.Provider
      value={{
        weather,
        getCurrentWeather,
        getWeatherTemp,
        getWeatherPop,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};
