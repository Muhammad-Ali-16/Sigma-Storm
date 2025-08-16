import axios from 'axios';
import { useState } from 'react'
import '../src/App.css'

function App() {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '36fa4457c1b18bf0c51800776d9d0d27';

  async function GetWeather() {

    if (!city) {
      setError('Please Enter A City Name')
      return
    }

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      setError('')
      setWeather(response.data)
    }
    catch (err) {
      setWeather(null)
      setError('City Not Found')
    }
  }

  return (<>
    <div className="bg-[#121212] flex justify-center items-center flex-col h-screen p-4">
      <h1 className='font-bold text-4xl mb-4 text-[#E0E0E0]'>SigmaStorm</h1>

      {weather && (
        <div className="bg-[#1E1E2E] text-[#E0E0E0] px-6 py-8 rounded-xl shadow-lg leading-8 w-[300px] text-center">
          <h2 className="font-bold text-3xl mb-4">
            {weather.name}, {weather.sys.country}
          </h2>
          <p>🌡 Temperature: {weather.main.temp}°C</p>
          <p>🤔 Feels Like: {weather.main.feels_like}°C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌥 Weather: {weather.weather[0].description}</p>
        </div>
      )}

      {error && <p className="text-red-400 mt-4">{error}</p>}

      <input
        className="border border-[#3E3E55] bg-[#2A2A3B] text-[#E0E0E0] p-2 w-[250px] m-2 rounded-md placeholder-gray-400 focus:outline-none focus:border-[#BB86FC] focus:ring-1 focus:ring-[#BB86FC] my-4"
        placeholder="Enter City..."
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button
        onClick={GetWeather}
        className="cursor-pointer bg-[#3F51B5] hover:bg-[#5C6BC0] text-white px-4 py-2 rounded-md shadow-md transition"
      >
        Check Weather
      </button>
    </div>
  </>
  )
}

export default App
