import react from 'react'
import '../styles/App.css'

function WeatherCard() {
    return (
        <div className="WeatherCard">
            <div className="card">
                <h2>Weather Card</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='zipCode'>Zip Code:</label>
                    <input 
                        type='text'
                        id='zipCode'
                        name='zipCode'
                        value={zipCode}
                        onChange={handleInputChange}
                    />
                    <button> Get Weather </button>
                </form>
                <WeatherCard zipCode={zipCode} />    
                    
                
            </div>
        </div>
    )
}

export default WeatherCard