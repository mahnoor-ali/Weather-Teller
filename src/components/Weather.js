import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Weather() {
  const [weather, setWeather] = useState({ cloudPct: '', Humidity: '', temperature: '', feelsLike: '', minTemp: '', maxTemp: '' });
  const [error, setError] = useState(false);
  const [location, setLocation] = useState('Lahore');
  const getWeather = async () => {
    axios({
      url: 'https://api.api-ninjas.com/v1/weather?city=lahore',
      method: 'GET',
      headers: {
        'X-Api-Key': 'fIPnPSMBFoybunPrZ6arNPOAWqvw0J1kqmZBDuPR',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setWeather( prevWeather=> ({ cloudPct: response.data.cloud_pct , Humidity: response.data.humidity, temperature: response.data.temp, feelsLike: response.data.feels_like , minTemp: response.data.min_temp , maxTemp: response.data.max_temp}));
        console.log(response.data);
        setError(false);
      })
      .catch(error => {
        console.error(error);
      })
  }


  useEffect(() => {
    getWeather()
  }, [location])

  return (
    <div>
      weather
      {/* {errorMsg ? <div>{errorMsg}</div> : null} */}

    </div>
  )
}
