import { useEffect, useState } from 'react'
import './App.css'


const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;


function App() {
  const [city, setCity] = useState('New_York')
  const [weather, setWeather] = useState([])

  const [search, setSearch] = useState("")

  const callAPI = async () => {
    fetch(`https://api.weatherbit.io/v2.0/current?&city=${city}&key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => setWeather(data.data))
    .catch((error) => console.error(error));

    console.log(weather);
  };

  useEffect(() => {
    callAPI();
  }, []);

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  const sunsetCountdown = () => {
    const date = new Date();
    const hours = date.getUTCHours();
    const mins = date.getUTCMinutes();

    let total_current_mins = (hours * 60) + mins

    const sunset = current.sunset.split(":");
    let sunset_hours = parseInt(sunset[0]);
    let sunset_mins = parseInt(sunset[1]);

    let total_sunset_mins = (sunset_hours * 60) + sunset_mins


    let total_time_left = total_sunset_mins - total_current_mins

    let hours_left = total_time_left / 60
    let mins_left = total_time_left % 60

    if (hours_left < 0){
      return ("Sun has already set.")
    }else{
      return (`${hours_left.toFixed(0)} hrs ${mins_left.toFixed(0)} mins UTC`)
    }
  }

  const sunriseCountdown = () => {
    const date = new Date();
    const hours = date.getUTCHours();
    const mins = date.getUTCMinutes();

    let total_current_mins = (hours * 60) + mins

    const sunrise = current.sunrise.split(":");
    let sunrise_hours = parseInt(sunrise[0]);
    let sunrise_mins = parseInt(sunrise[1]);

    let total_sunrise_mins = (sunrise_hours * 60) + sunrise_mins


    let total_time_left = total_sunrise_mins - total_current_mins

    let hours_left = total_time_left / 60
    let mins_left = total_time_left % 60

    console.log(`Current Time: ${hours} hrs ${mins} mins UTC`)

    if (hours_left < 0){
      return ("Sun has already risen.")
    }else{
      return (`${hours_left.toFixed(0)} hrs ${mins_left.toFixed(0)} mins UTC`)
    }
  }

  const tempDiff = () => {
    const temp_diff = current.temp - current.app_temp

    if (temp_diff < 0){
      return (temp_diff * -1)
    }else{
      return temp_diff
    }
  }

  const filterResults = (search) => {
    // return weather // This searches ALL the values in item, but does not display specific values to match what's entered. If you enter the % for humidity, it will show ALL the data on that item, not just humidity.
    //   .filter(item => {
    //     search = search.toLowerCase();

    //     return Object.values(item).some(value => String(value).toLowerCase().includes(search)) // Within the Object, for values in item, .some -> if value is included in search, return TRUE
    //   })
    //   .map((item, index) => (
    //     <li key={index}>
    //       Nearest Reporting Station ID: <b>{item.station}</b>
    //       <br></br>
    //       Humidity: <b>{item.rh}%</b>
    //     </li>
    //   )
    // );

    return weather
      .filter(item => item.city_name.toLowerCase().includes(search.toLowerCase()))
      .map((item, index) => (
        <li key={index}>
          {item.city_name} - {item.temp}°C<br></br><br></br>
          Humidity: {current.rh}%<br></br>
          Air Quality Index: {current.aqi}<br></br>
          Precipitation: {current.precip}<br></br>
          UV Index (0-11+): {current.uv}<br></br>
          Solar Radiation: {current.solar_rad}<br></br>

          Pressure (mb): {current.pres}<br></br>
          Sea Level Pressure (mb): {current.slp}<br></br>
          Cloud Coverage: {current.clouds}<br></br>
          Wind Speed: {current.wind_spd}<br></br>
          Gust: {current.gust}<br></br>
          Wind Direction: {current.wind_cdir}<br></br>
        </li>
      )
    );
  
  }

  const current = weather[0]

  return (
    <>
      <div className="page">
        <h1>Weather by Location</h1>
        <h3>Enter City: </h3>
        <form>
          <input type="text" id="city" name="city" value={city} onChange={handleChange}></input>
        </form>
        {/* {city} */}
        <button onClick={callAPI}>Confirm</button>

        {current && current.sunset && current.sunrise && (
          <div className="summary-cards">
            <div className="card">
              <h2>Time Until Sunset</h2>
              <h3>{sunsetCountdown()}</h3>
            </div>
            <div className="card">
              <h2>Time Until Sunrise</h2> 
              <h3>{sunriseCountdown()}</h3>
            </div>
            <div className="card">
              <h2>Real Feel & Temp Difference</h2> 
              <h3>{tempDiff()}</h3>
            </div>
          </div>
        )}

        {current && (
          <div className="weather-card">
            <h2>{current.city_name}, {current.state_code}, {current.country_code}</h2>
            <h3>{current.lat}, {current.lon}</h3>
            <h3>Time Zone - {current.timezone}</h3>

            <h3>Nearest Reporting Station ID: {current.station}</h3>

            <p>🌅 Sunrise at {current.sunrise} UTC</p>
            <p>🌇 Sunset at {current.sunset} UTC</p>

            <h1>{current.temp} °C</h1>
            <h2>Feels Like {current.app_temp} °C</h2>

            <br></br>

            <h3>Search by City:</h3>
            <form>
              <input type="text" id="search" name="search" value={search} onChange={e => setSearch(e.target.value)}></input>
            </form>
            {/* {search} */}

            <br></br>

            <div className="filter-results">
              <ul>
                {filterResults(search)}
              </ul>
            </div>

            <br></br>

            {/* <p>Humidity: {current.rh}%</p>
            <p>Air Quality Index: {current.aqi}</p>
            <p>Precipitation: {current.precip}</p>
            <p>UV Index (0-11+): {current.uv}</p>
            <p>Solar Radiation: {current.solar_rad}</p>

            <p>Pressure (mb): {current.pres}</p>
            <p>Sea Level Pressure (mb): {current.slp}</p>
            <p>Cloud Coverage: {current.clouds}</p>
            <p>Wind Speed: {current.wind_spd}</p>
            <p>Gust: {current.gust}</p>
            <p>Wind Direction: {current.wind_cdir}</p> */}
          </div>
        )}
      </div>
    </>
  )
}

export default App
