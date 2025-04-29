"use client";
import React, { useState } from "react";

// components
import Forecast from "./components/forecast";
import Today from "./components/today";
import Wind from "./components/wind";
import Humidity from "./components/humidity";
import Search from "./components/search";

// data type definition
interface ForecastData {
  list: {
    dt: number;
    weather: { icon: string; description: string }[];
    main: { temp: number };
  }[];
  city: {
    id: number;
    name: string;
    coord: { lat: number; lon: number };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home() {
  // states
  const [data, setData] = useState<ForecastData | "">("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const API = process.env.NEXT_PUBLIC_WEATHER_API;

  // function to handle search input and fetch weather data of a city
  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${API}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch weather data.");
        const result = await response.json();
        setData(result);
        setError("");
        setLocation(""); // Clears search input after a successful fetch
      } catch {
        setError("City not found");
        setData("");
      }
    }
  };

  let content;
  // Show a welcome message if no search has been made and there is no error
  if (Object.keys(data).length === 0 && error === "") {
    content = (
      <div className="text-white text-center font-semibold">
        <h3 className="text-3xl">Welcome to Bree Weather App</h3>
        <p className="text-xl">Enter a city to get weather forecast</p>
      </div>
    );
  } else if (error !== "") {
    // The error message displayed in case of an error in search input
    content = (
      <div className="text-center text-xl font-semibold">
        <p>City not found</p>
        <p>Please enter a valid city.</p>
      </div>
    );
  } else {
    // The weather data of a searched city is displayed here
    content = (
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1/2 md:w-1/3">
          <Today data={data} />
        </div>
        <div className="w-full md:w-2/3">
          <Forecast data={data} />
        </div>
      </div>
    );
  }

  return (
    // <div className="bg-cover bg-gradient-to-r from-blue-700 to-blue-400 h-screen overflow-auto">
    <div className="h-screen w-full bg-[url('/blue.jpg'))] bg-no-repeat bg-cover bg-center">
      <div className="bg-white/25 w-full rounded-lg flex flex-col h-fit p-4">
        <div className="flex flex-col md:flex-row justify-between items-center p-4">
          <Search
            handleSearch={handleSearch}
            location={location}
            setLocation={setLocation}
          />
          <h1 className="mb-8 md:mb-0 order-1 text-white text-xl py-2 px-4 italic font-bold">
            Bree Weather App
          </h1>
        </div>

        {content}

        {error && (
          <div className="text-red-200 text-center font-semibold">{error}</div>
        )}
      </div>
    </div>
  );
}
