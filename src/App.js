import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

const api = {
    key: "d3e46ed4e04945b09955e0fd5c515f72",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e =>{
    if(e.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');

      });
    }
  }

    const dateBuilder = (d) => {
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ]

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()-1];
        let year = d.getFullYear();
        console.log(d.getMonth());

        return `${day} ${date} ${month} ${year}`
    }
    return (
        <div className= {(typeof weather.main != "undefined") ? 
        ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
            <main>
                <div className="search-box">
                    <input 
                    className="search-bar" 
                    type="text" 
                    placeholder="Search..."
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                    onKeyPress ={search}
                    />
                </div>
                {
                  (typeof weather.main != "undefined") ? (
                <>
                <div className="location-box">
                    <div className="location">
                        {weather.name}, {weather.sys.country}
                    </div>
                    <div className="date">
                        {dateBuilder(new Date())}
                    </div>
                </div>

                <div className="weather-box">
                    <div className="temp">
                    {Math.round(weather.main.temp)}°c
                    </div>
                      
                    <div className="weather">
                      {weather.weather[0].main }
                    </div>
                </div>
                </>
                
                ) : ('')}
            </main>

        </div>
    )
}
export default App;
