const Favorites = ({ favorites, onRemove, onSelect }) => {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Favorite Cities</h3>
        
        {favorites.length === 0 ? (
          <p className="text-gray-500">No favorite cities added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((fav) => (
              <div key={fav.location.name} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                <button 
                  onClick={() => onSelect(fav.location.name)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-left flex-1"
                >
                  {fav.location.name}, {fav.location.country}
                  <div className="flex items-center mt-1">
                    <img 
                      src={`https:${fav.current.condition.icon}`} 
                      alt={fav.current.condition.text} 
                      className="w-6 h-6"
                    />
                    <span className="ml-1 text-gray-700">{fav.current.temp_c}°C</span>
                  </div>
                </button>
                <button
                  onClick={() => onRemove(fav.location.name)}
                  className="text-red-500 hover:text-red-700 ml-2"
                  title="Remove from favorites"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
  
  export default Favorites