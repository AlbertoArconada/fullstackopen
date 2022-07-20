import axios from "axios";
import React, {useState, useEffect} from "react";

const Weather = ({name}) => {
    const [weather, setWeather] = useState(null)
    const api_key = process.env.REACT_APP_API_KEY
    
    const getWeatherHook = () => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${name}`)
            .then(response => {
                setWeather(response.data)
            })
    }

    useEffect(getWeatherHook, [])
    if(weather) {
        return (
            <div> 
            <h2>Weather in {name}</h2>
            <h3>Temperature: {weather.current.temperature}</h3>
            <img src={weather.current.weather_icons[0]} alt=""/>
            <h3>Wind: {weather.current.wind_speed}</h3>
        </div>
        )
    } else {
        return <div>Loading {name} weather, please wait...</div>
    }
}

export default Weather;