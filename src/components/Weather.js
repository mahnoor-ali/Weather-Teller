import React, { useEffect, useState } from 'react'
import axios from 'axios';
import background from '../assets/images/background.png';
import cloudy from '../assets/images/cloudy.png';
import Error from './Error';

export default function Weather() {
  const [weather, setWeather] = useState({ cloudPct: '', Humidity: '', temperature: '', feelsLike: '', minTemp: '', maxTemp: '' });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Error');
  const [errorCode, setErrorCode] = useState('Error');
  const [tempLocation, settempLocation] = useState('Lahore'); // this is the location that updates while user inputs
  const [location, setLocation] = useState('Lahore');
  const [date, setDate] = useState('Day');
  const getWeather = async () => {
    axios({
      url: `https://api.api-ninjas.com/v1/weather?city=${location}`,
      method: 'GET',
      headers: {
        'X-Api-Key': 'fIPnPSMBFoybunPrZ6arNPOAWqvw0J1kqmZBDuPR',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setWeather(prevWeather => ({ cloudPct: response.data.cloud_pct, Humidity: response.data.humidity, temperature: response.data.temp, feelsLike: response.data.feels_like, minTemp: response.data.min_temp, maxTemp: response.data.max_temp }));
        setError(false);
      })
      .catch(error => {
        setError(true);
        console.error(error);
        setErrorMsg(error.message);
        setErrorCode(error.code);
      })

    //set Day and Date
    let date = new Date();
    date = date.toDateString();
    const dateDay = date.substring(0, date.length - 4);
    setDate(dateDay);
  }

  const changeLocation = (event) => {
    setLocation(tempLocation);
  }

  const resetPage = () => {
    setLocation('Lahore');
    settempLocation('Lahore');
  }

  const modifyLocation = (event) => {
    settempLocation(event.target.value);
  }
  useEffect(() => {
    getWeather();
  }, [location])

  return (
    <div id="popup" style={{ backgroundImage: `url(${background})` }}>
   {/* render this when response status code is 200 i.e no error */}
  { !error &&
    <div>
      <div>
        <input id="location" type="text" value={tempLocation} onChange={modifyLocation} />
        <button className="refresh" onClick={changeLocation}><i className="bi bi-arrow-clockwise" ></i></button>
      </div>

      <div id="weather-info">
        <img src={cloudy} alt="weather" />
        <div id="temperature">{weather.temperature}°</div>
        <div id="hi-low" >H:{weather.maxTemp} / L:{weather.minTemp}</div>
        <div></div>
        <div></div>
        <div id="date">{date}</div>
      </div>

      <div id="details">
        <div>Humidity</div>
        <div id="cloud-pct">Cloud</div>
        <div >Feels Like</div>
        <div id="humidity">{weather.Humidity}%</div>
        <div id="cloud-pct"> {weather.cloudPct}%</div>
        <div id="feels-like"> {weather.feelsLike}°</div>
      </div>
      </div>
    }

    {/* render this when response status code is not 200 i.e error */}
    { error &&
      <Error code={errorCode} msg={errorMsg} handleRefresh={resetPage} />
    }

    </div>
  )
}