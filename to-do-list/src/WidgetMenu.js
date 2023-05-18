
import React, { useState,  useEffect} from 'react';
import { FaCat } from 'react-icons/fa';
import axios from 'axios';

function WidgetMenu() {





  const [city, setCity] = useState('London'); 
  const [weather, setWeather] = useState(null); 

  const apiKey = '5179f0ae9c01dbc5f91f3eabaaa6e8ef'; 
  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (city) {
      getWeather();
    }
  }, [city, apiKey]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };



  const [activity, setActivity] = useState("");

  useEffect(() => {
    fetch("https://www.boredapi.com/api/activity")
      .then((response) => response.json())
      .then((data) => {
        setActivity(data.activity);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



    const [catFact, setFact] = useState("");
    useEffect(() => {
        fetch("https://catfact.ninja/fact")
          .then((response) => response.json())
          .then((data) => setFact(data.fact))
          .catch((error) => console.log(error));
      }, []);
  


      const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => setImageUrl(data.message))
      .catch(error => console.log(error));
  }, []); 
  const [ipInfo, setIpInfo] = useState(null); 
  useEffect(() => {
    fetch("http://ip-api.com/json/")
      .then((response) => response.json())
      .then((data) => setIpInfo(data))
      .catch((error) => console.log(error));
  }, []);

  if (!ipInfo) {
    return <div>Loading...</div>;
  }
   

  
    return (
      <div>
       
       <div className="continer d-flex justify-content-center m-4 row">
         
          <div className="col-md-5 m-2 bg-light rounded p-4">
          <h3>Feeling Bored?</h3>
      <p>You should do:</p>
      <p>{activity}</p>
          </div>
          <div className="col-md-5 m-2 bg-light rounded p-4">
          <h3>Your IP information:</h3>
      <p>Status: {ipInfo.status}</p>
      <p>Country: {ipInfo.country}</p>
      <p>City: {ipInfo.city}</p>
      <p>Timezone: {ipInfo.timezone}</p>
          </div>
          <div className="col-md-5 m-2 bg-light rounded p-4">
          <p>{catFact}</p>
          <FaCat size={32} color="black" />
          </div>
          <div className="col-md-5 m-2  d-flex justify-content-center bg-light rounded p-4" >
          <img src={imageUrl} style={{ maxWidth: 10 +"rem" }}alt="A random dog" />
          </div>
          <div className="col-md-10 m-2 bg-light rounded p-4">
          <input type="text"  className="form-control d-inline w-50" value={city} onChange={handleCityChange} />
      {weather && (
        <div>
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      )}
          </div>
       </div>
      </div>
    );
  }
  
  export default WidgetMenu;