import './App.css';
import {useEffect, useState} from "react";
import CurrentWeather from './CurrentWeather';
import DailyWeather from './DailyWeather';
import SearchBar from './SearchBar';
import Error from './Error';

function App() {

  const [weather, setWeather] = useState({});
  const [latLon, setLatLon] = useState([33.44, -94.04]);
    // Set default as Chicago
  const [error, setError] = useState(false);
  const apiKey = "bfc04fc93ef7abe8a19089cc9d683a3f";
  const missing = document.querySelector(".missing")

  // Pulls Chicago info on launch, and updates whenever "latLon" has been changed
  useEffect(() => {

    missing ? missing.classList.add("display") : null

    setError(false);

    const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
    url.search = new URLSearchParams({
      lat: latLon[0],
      lon: latLon[1],
      appid: apiKey,
      units: "metric",
      exclude: "alerts,hourly,minutely"
    });
  
    fetch(url).then((data) => {
      return data.json();
    }).then((jsonData) => {
      setWeather(jsonData);
    });

  }, [latLon]);

  // Singular function used to fetch Latitude and Longitude when City or Zip/Country are provided. If a city was provided, run the If statement, otherwise, run the Else. New setCoords() function created to reduce duplicate code.
  const getLatLon = (city, zip, country) => {

    if (city) {
      const url = new URL("https://api.openweathermap.org/data/2.5/weather")
      url.search = new URLSearchParams({
        q: city,
        appid: apiKey
      })
  
      fetch(url).then(data => data.json())
        .then(jsonData => setCoords(jsonData));

    } else {
      // Error checking as Canadian postal codes don't work correctly
      if (country.toLowerCase() === "ca") {
        zip = zip.slice(0, 3);
      }

      const url = new URL("https://api.openweathermap.org/data/2.5/weather")
      url.search = new URLSearchParams({
        zip: `${zip},${country}`,
        appid: apiKey
      })
  
      fetch(url).then(data => data.json())
        .then(jsonData => setCoords(jsonData));
    }

    const setCoords = (data) => {
      try {
        setLatLon([data.coord.lat, data.coord.lon])
      } catch {
        setError(true);
      }
    }

  }

  // Component functions. Made in the parent as it's used in multiple components.
  const dateGenerate = (date) => {
    return new Date(date * 1000).getDate();
  }

  const iconGenerate = (day) => {
    return (
      <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={`Icon for ${day.weather[0].description} weather.`} />
    )
  }

  const suffix = (date) => {
    if (date === 1 || date === 21 || date === 31) {
      return <h2>{date}<sup>st</sup></h2>
    } else if (date === 2 || date === 22) {
      return <h2>{date}<sup>nd</sup></h2>
    } else if (date === 3 || date === 23) {
      return <h2>{date}<sup>rd</sup></h2>
    } else {
      return <h2>{date}<sup>th</sup></h2>
    }
  }

  // One query determines whether a City or Zip/Country code was entered, and processes the information respectively. Additional error handling.
  const formQuery = (e) => {
    e.preventDefault()

    if (e.target[0].value === "" && e.target[1].value === "") {
      missing.classList.remove("display")
    } else if (e.target[1].value) {
      if (e.target[2].value === "") {
        missing.classList.remove("display")
      } else {
        getLatLon(null, e.target[1].value, e.target[2].value)
      }
    } else {
      getLatLon(e.target[0].value)
    }

    e.target[0].value = ""
    e.target[1].value = ""
    e.target[2].value = ""
  }

  return (
        <>
          <header>
            <h1>Get the Weather</h1>
            <div className="missing display"><p>Please enter a city, or provide both Zip and Country Code.</p></div>
            <SearchBar formQuery={(e) => formQuery(e)} />
          </header>

          {
            !weather.daily ? <p>Loading</p> : 

              error ? <Error /> :
              
              <main>
                <div className="grid">
                  <CurrentWeather weather={weather} date={dateGenerate(weather.current.dt)} icon={iconGenerate} suffix={suffix} />
                  <DailyWeather weather={weather.daily} date={dateGenerate} icon={iconGenerate} suffix={suffix} />
                </div>
              </main>
          }

          <footer>
            <p>Created by <a href="https://www.shaunms.com">Shaun S</a> with help from the <a href="https://openweathermap.org/">OpenWeather API</a> - 2021</p>
          </footer>
        </>
  );
}

export default App;
