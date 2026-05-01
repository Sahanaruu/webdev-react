import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import RecentSearches from "./components/RecentSearches";
import Clock from "./components/Clock";
import "./styles.css";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [recent, setRecent] = useState(
    JSON.parse(localStorage.getItem("recent")) || []
  );

  // 🌤️ Fetch Weather Function (FINAL FIXED VERSION)
  const fetchWeather = async (city) => {
    if (!city) return;

    try {
      const apiKey = import.meta.env.VITE_API_KEY;

      if (!apiKey) {
        alert("API key not found. Check your .env file");
        return;
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      const data = await response.json();
      console.log("API RESPONSE:", data);

      // Error handling
      if (data.cod === "404") {
        alert("City not found");
        return;
      }

      if (data.cod === 401) {
        alert("API key not activated yet. Wait 10-30 minutes.");
        return;
      }

      // Save weather data
      setWeather(data);

      // Save recent searches
      const updated = [city, ...recent.filter((c) => c !== city)].slice(0, 5);
      setRecent(updated);
      localStorage.setItem("recent", JSON.stringify(updated));

    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  // Clear recent searches
  const clearRecent = () => {
    setRecent([]);
    localStorage.removeItem("recent");
  };

  return (
    <div className="app">
      <Clock />

      <h1>🌤️ Aapka Apna Weather</h1>

      <SearchBar onSearch={fetchWeather} />

      <RecentSearches
        items={recent}
        onClick={fetchWeather}
        clear={clearRecent}
      />

      {weather && <WeatherCard data={weather} />}
    </div>
  );
}