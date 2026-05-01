export default function WeatherCard({ data }) {
  const d = data.main;
  const wind = data.wind;

  // 🌤️ Weather icon from API
  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="card">
      <div className="titleRow">
        <img src={iconUrl} alt="weather icon" />
        <h2>{data.name}</h2>
      </div>

      <h1>{Math.round(d.temp)}°C</h1>
      <p>Feels like {Math.round(d.feels_like)}°C</p>

      <div className="grid">
        <div>💧 Humidity: {d.humidity}%</div>
        <div>🌬️ Wind: {wind.speed} m/s</div>
        <div>ضغط Pressure: {d.pressure} hPa</div>
        <div>👁️ Visibility: {data.visibility / 1000} km</div>
      </div>
    </div>
  );
}