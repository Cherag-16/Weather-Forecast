const CurrentWeather = ({ data }) => {
    const weather = data.current
    const location = data.location
  
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src={`https:${weather.condition.icon}`} 
              alt={weather.condition.text} 
              className="w-16 h-16"
            />
            <div className="ml-4">
              <h3 className="text-4xl font-bold text-gray-800">
                {weather.temp_c}°C
              </h3>
              <p className="text-gray-600">{weather.condition.text}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-600">Humidity</p>
              <p className="text-lg font-semibold">{weather.humidity}%</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-600">Wind</p>
              <p className="text-lg font-semibold">{weather.wind_kph} km/h</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-600">Feels Like</p>
              <p className="text-lg font-semibold">{weather.feelslike_c}°C</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-600">Pressure</p>
              <p className="text-lg font-semibold">{weather.pressure_mb} mb</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-600">
            Local Time: {location.localtime}
          </p>
        </div>
      </div>
    )
  }
  
  export default CurrentWeather