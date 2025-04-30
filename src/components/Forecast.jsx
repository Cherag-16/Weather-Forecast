const Forecast = ({ data }) => {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">5-Day Forecast</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {data.forecastday.map((day) => (
            <div key={day.date} className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="font-medium text-gray-700">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                className="mx-auto w-12 h-12"
              />
              <div className="flex justify-center gap-2 mt-2">
                <span className="font-semibold text-gray-800">{day.day.maxtemp_c}°</span>
                <span className="text-gray-600">{day.day.mintemp_c}°</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default Forecast