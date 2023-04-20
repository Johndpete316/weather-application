// create a weather card that gets the weather as a prop from the zip code form
// the weather card should display the current temperature, the high and low for the day, and the current weather conditions
// use svgs and css to display the weather conditions
// the card should not be visilbe until the user has submitted a zip code
// the card should have a loading animation while the weather data is being fetched

import React, { useState, useEffect, useRef } from 'react'
import { WeatherResponse } from '../models/weather'
import '../styles/WeatherCard.css'

interface WeatherCardProps {
    weatherData: WeatherResponse | null
    isLoading: boolean
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, isLoading }) => {

    const cardRef = React.createRef<HTMLDivElement>()

    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.style.animation = 'scaleIn 0.5s';
        }
    }, [weatherData])

    if (isLoading) {
        return <div className='weather-card loading'>Loading...</div>
    }

    if (!weatherData) {
        return <div className='weather-card'> waiting for user...</div>
    }

    const {temp, temp_min, temp_max } = weatherData.main
    const {name} = weatherData
    const {description} = weatherData.weather[0]
    const {icon} = weatherData.weather[0]

    return (
        <div className='weather-card'>
            <h2>{ name ? name :  "Weather Data" }</h2>
            <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" />
            <p>Temperature: {temp}</p>
            <p>High: {temp_max}°F</p>
            <p>Low: {temp_min}°F</p>
            <p>Conditions: {description}</p>
        </div>
    )
}

export default WeatherCard