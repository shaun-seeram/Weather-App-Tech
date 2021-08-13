const DailyWeather = ({weather, date, icon, suffix}) => {
    return (
        weather.slice(1).map((day) => {
            return (
                <ul className="daily" key={day.dt}>
                    <li>{icon(day)}</li>
                    <li className="desc">{day.weather[0].description}</li>
                    <li>{suffix(date(day.dt))}</li>
                    <li>High: {Math.round(day.temp.max)}°c</li>
                    <li>Low: {Math.round(day.temp.min)}°c</li>
                    <li>{day.wind_speed}m/s</li>
                    { day.rain ? <li>Precipitation: {day.rain}mm</li> : null }
                    <li>Humidity: {day.humidity}%</li>      
                </ul>
            )
        })
    )
}

export default DailyWeather