const Alerts = ({ alerts }) => {
    if (!alerts || alerts.alert.length === 0) return null
  
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
        <h3 className="font-bold text-red-800 mb-2">Weather Alerts</h3>
        {alerts.alert.map((alert, index) => (
          <div key={index} className="mb-3 last:mb-0">
            <h4 className="font-semibold text-red-700">{alert.headline}</h4>
            <p className="text-red-600 text-sm">{alert.desc}</p>
            <p className="text-red-500 text-xs mt-1">
              Effective: {new Date(alert.effective).toLocaleString()} - 
              Expires: {new Date(alert.expires).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    )
  }
  
  export default Alerts