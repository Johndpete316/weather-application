import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { apiKey } from '../../config.json'
import { WeatherResponse } from '../models/weather'
import '../styles/ZipCodeForm.css'

import WeatherCard from './WeatherCard'

interface FormState {
    zipCode: string
}

const ZipCodeForm: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null)
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    // local storage to save last used zip code
    const [zip, setZip] = useState<string>(() => {
        const savedZip = localStorage.getItem('zip_code');
        return savedZip !== null ? String(savedZip) : '12456';
    });

    useEffect(() => {
        localStorage.setItem('zip_code', zip.toString());
    }, [zip]);

    // form submission handliing

    const [formState, setFormState] = useState<FormState>({ zipCode: zip })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormState({ ...formState, [name]: value })
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const zipCode = formState.zipCode
        setIsLoading(true)

        // update local storage
        setZip(String(zipCode))

        const url: string = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=imperial`;

        try {
            const response = await axios.get<WeatherResponse>(url)
            console.log(response.data.main.temp)

            // update weather state
            setWeatherData(response.data)
            animateSubmitButton()
        } catch (error) {
            console.error('Error fetching weather data:', error)
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 500);

        }
    }

    const animateSubmitButton = () => {
        setSubmitSuccess(true);
        setTimeout(() => {
            setSubmitSuccess(false);
        }, 1500);
    }

    return (
        <div className='card'>
            <h1 className='card-title'> Instant Weather Report </h1>
            <WeatherCard weatherData={weatherData} isLoading={isLoading} />
            <h3 className='card-title'> Enter Zip</h3>
            <form className='card-form' onSubmit={handleSubmit}>
                <input className='card-input'
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    value={formState.zipCode}
                    onChange={handleChange}
                    required
                />
                <button id='card-button' className={submitSuccess ? 'submit-success' : ''} type="submit">
                    <span className='card-span'>Submit</span>
                    <svg className='card-svg' viewBox='0 0 20 20'>
                        <path d="M10 1.6C5.1 1.6 1 5.7 1 10.6 1 15.5 5.1 19.6 10 19.6 14.9 19.6 19 15.5 19 10.6 19 5.7 14.9 1.6 10 1.6ZM8.3 14.8L4.5 11 5.9 9.6 8.3 12 14.1 6.2 15.5 7.6 8.3 14.8Z"></path>
                    </svg>
                </button>
            </form>
            
        </div>
    )
}

export default ZipCodeForm