import { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/search/search";
import Forecast from "./components/forecast/Forecast";
import CurrentWeather from "./components/currentWeather/currentWeather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./components/search/API";
import Login from "./components/login/Login";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    if (!searchData) {
      searchData = { value: "6.9387469 79.8541134",label:"Colombo, Western Province"};
    }

    let [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  useEffect(() => {
    // Fetch default city weather when component mounts
    handleOnSearchChange(null);
  }, []);

  return (
    <div>
      {loggedInUser ? (
        <div className="container">
          <h1>Welcome, {loggedInUser}!</h1>
          <Search onSearchChange={handleOnSearchChange} />
          {currentWeather && <CurrentWeather data={currentWeather} />}
          {forecast && <Forecast data={forecast} />}
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
