import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export const Route = createFileRoute("/weather")({
  component: Weather,
});

function Weather() {

  const [weather, setWeather] =
    useState<any>(null);

  useEffect(() => {

    const loadWeather = async () => {

      const response =
        await axios.get(
          "https://api.open-meteo.com/v1/forecast?latitude=18.2346&longitude=73.4408&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
        );

      setWeather(response.data);

    };

    loadWeather();

  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🌤 Raigad Weather</h1>

      {weather ? (
        <>
          <h2>
            Temperature:
            {weather.current.temperature_2m}°C
          </h2>

          <h3>
            Humidity:
            {weather.current.relative_humidity_2m}%
          </h3>

          <h3>
            Wind Speed:
            {weather.current.wind_speed_10m} km/h
          </h3>
        </>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
}