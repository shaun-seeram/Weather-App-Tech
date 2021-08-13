const CurrentWeather = ({weather, date, icon, suffix}) => {
    
    return (
        <ul className="current">
            <li>{icon(weather.current)}</li>
            <li className="desc">{weather.current.weather[0].description}</li>
            <li>{suffix(date)}</li>
            <li>{Math.round(weather.current.temp)}°c</li>
            <li>High: {Math.round(weather.daily[0].temp.max)}°c</li>
            <li>Low: {Math.round(weather.daily[0].temp.min)}°c</li>
            <li>Windspeed: {weather.current.wind_speed}m/s</li>
            { weather.current.rain ? <li>Precipitation: {weather.current.rain}mm</li> : null }
            <li>Humidity: {weather.current.humidity}%</li>      
        </ul>
    )
}

export default CurrentWeather