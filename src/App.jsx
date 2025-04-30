import { useState, useEffect } from 'react'
import axios from 'axios'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import Favorites from './components/Favorites'
import Search from './components/Search'
import Alerts from './components/Alerts'

const API_KEY = 'c27e8a4be8f140489cd62854253004'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [alerts, setAlerts] = useState(null)
  const [location, setLocation] = useState('')
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [coords, setCoords] = useState(null)

  // Fetch weather data
  const fetchWeather = async (query) => {
    setLoading(true)
    setError(null)
    try {
      // Current weather
      const currentRes = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`
      )
      setWeatherData(currentRes.data)
      
      // Forecast
      const forecastRes = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=5`
      )
      setForecastData(forecastRes.data.forecast)
      
      // Alerts
      setAlerts(forecastRes.data.alerts)
      
      setLocation(forecastRes.data.location.name)
    } catch (err) {
      setError('Failed to fetch weather data. Please try another location.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Handle search
  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      fetchWeather(searchQuery)
    }
  }

  // Add to favorites
  const addToFavorites = () => {
    if (weatherData && !favorites.some(fav => fav.location.name === weatherData.location.name)) {
      setFavorites([...favorites, weatherData])
    }
  }

  // Remove from favorites
  const removeFromFavorites = (cityName) => {
    setFavorites(favorites.filter(fav => fav.location.name !== cityName))
  }

  // Get user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
        },
        (err) => {
          console.error("Geolocation error:", err)
        }
      )
    }
  }, [])

  // Fetch weather for current location when coords change
  useEffect(() => {
    if (coords) {
      fetchWeather(`${coords.lat},${coords.lon}`)
    }
  }, [coords])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Weather Forecast</h1>
        
        <Search onSearch={handleSearch} />
        
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-blue-700">Loading weather data...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {weatherData && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-blue-800">
                {weatherData.location.name}, {weatherData.location.country}
              </h2>
              <button
                onClick={addToFavorites}
                className="bg-yellow-400 hover:bg-yellow-500 text-yellow-800 font-medium py-2 px-4 rounded transition"
                disabled={favorites.some(fav => fav.location.name === weatherData.location.name)}
              >
                {favorites.some(fav => fav.location.name === weatherData.location.name) 
                  ? 'Already in Favorites' 
                  : 'Add to Favorites'}
              </button>
            </div>
            
            <CurrentWeather data={weatherData} />
            
            {alerts && <Alerts alerts={alerts} />}
            
            {forecastData && <Forecast data={forecastData} />}
          </div>
        )}
        
        <Favorites 
          favorites={favorites} 
          onRemove={removeFromFavorites}
          onSelect={fetchWeather}
        />
      </div>
    </div>
  )
}

export default App