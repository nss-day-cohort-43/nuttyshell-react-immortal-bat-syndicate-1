import React, { useContext, useEffect, useState } from "react";
import { WeatherCard } from "./weather/WeatherCard";
import { WeatherContext } from "./weather/WeatherProvider";
import { Divider } from "semantic-ui-react"
import logo from "../img/ibs-logo_words.png"
import "./Home.css"

export const Home = () => {
  const { getCurrentWeather } = useContext(WeatherContext)
  const [weather, setWeather] = useState({})
  const [temp, setPop] = useState({})

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
    }

    function showPosition(position) {
      getCurrentWeather(position.coords.latitude, position.coords.longitude).then(res => {
        setWeather(res)
        setPop(res.main)
      })
    }
    getLocation()

  }, [])


  return (
    <>
      <div className="homeContainer">
        <div className="homeInfo">
          <img src={logo} alt="IBS logo" className="ibsLogoHome" />

          <Divider />

          <WeatherCard key="1" weather={weather} temp={temp}></WeatherCard>
        </div>
      </div>
    </>
  )

}