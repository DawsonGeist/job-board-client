import { React, useState, useEffect } from 'react';
import axios from 'axios';

const displayWeather = (weather) => {
    if(weather.length > 0) {
        return (
            <ul>
                {weather.map((forecast) => {
                    console.log(forecast)
                    let forecastStr = `${forecast.date} - ${forecast.summary} - ${forecast.temperatureF} Degrees F`
                    return (
                        <li>{forecastStr}</li>
                    )
                })}
            </ul>
        )
    }
    else {
        return (
            <p>fetching weather data...</p>
        )
    }
}

const WeatherModule = () => {
    const [weather, setWeather] = useState([])
    const [fetchWeather, setFetchWeather] = useState(true)

    useEffect(() => {
        if(fetchWeather) {
            axios.get("http://localhost:5156/WeatherForecast", { params: {}})
            .then((res) => {
                if(res.data) {
                    console.log(res.data)
                    setWeather(res.data)
                    setFetchWeather(false)
                }
            })
            .catch((err) => {
                console.log('error')
            })
            .finally(() => {
                console.log('End Fetch Weather')
            })
        }   
    })

    return (
        <div>
            <h3>Weather Forecast</h3>
            {displayWeather(weather)}
        </div>
    )
}

export default WeatherModule;