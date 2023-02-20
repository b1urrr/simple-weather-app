import Axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';
import './weather.css'

function Weather() {
    

    // Populates the weather in Sofia on page load
    const onLoad = useEffect(() => {
        getWeather();
      }, []);

    // Updates city 
    const [city, setCity] = useState("Sofia")
    const [updatedCity, setUpdatedCity] = useState(city)

    // Updates the temperature and icon
    const [temp, setTemp] = useState("")
    const [weatherIcon, setWeatherIcon] = useState("")
  
    // API url
    const apiKey = process.env.OWM_API_KEY
    const units = "&units=metric"
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",Bulgaria&appid=" + apiKey + units
    
    // Handles the change in the input
    const handleChange = (event) => {
        setCity(event.target.value)
    }

    // When the button is clicked it sets the input city and makes a new API call for that city
    const handleClick = () => {
        setUpdatedCity(city)
        getWeather()
        console.log("button clicked")
    }

    // API call function
    const getWeather = () => {
        Axios.get(apiUrl)
        .then((res) => {
            
            // Get temperature
            setTemp(Math.floor(res.data.main.temp))
            // Get icon of the weather type
            setWeatherIcon(res.data.weather[0].icon)

        }
        )
}


    return (
        <div className='api__weather'>
            <div className='api__weather-header'>
                <h1>{updatedCity}</h1>
            
                <div className='api__weather-temp'>
                    <img src={"http://openweathermap.org/img/w/" + weatherIcon + ".png"} alt="weather icon"/>
                    <h1>{temp}°</h1>
                </div>
            </div>
            <div className='api__weather-input'>
                <input 
                type="text"
                placeholder="Type any city in Bulgaria"
                onChange={handleChange}
                />
                <button 
                onClick={handleClick}>
                Get Weather
                </button>
            </div>

        </div>
    );
  }

export default Weather;