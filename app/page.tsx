"use client";
import React, { useState } from "react";

// components
import Forecast from "./components/forecast";
import Today from "./components/today";
import Wind from "./components/wind";
import Humidity from "./components/humidity";
import Search from "./components/search";

export default function Home() {
  const [data, setData] = useState<any>({});
  const [location, setLocation] = useState("Nairobi");
  const [error, setError] = useState("");

  const API = process.env.NEXT_PUBLIC_WEATHER_API;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${API}&units=metric`;

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch weather data.");
        const result = await response.json();
        setData(result);
        setError("");
      } catch {
        setError("City not found");
        setData({});
      }
    }
  };

  const fetchedDate = new Date(data.dt * 1000); // Convert the timestamp to a Date object
  const day = fetchedDate.getDate(); // extract the day
  const month = fetchedDate.toLocaleString("default", { month: "long" });

  let content;
  if (Object.keys(data).length === 0 && error === "") {
    content = <div className="text-white">Welcome to Bree Weather App</div>;
  } else if (error !== "") {
    content = (
      <div>
        <p>City not found</p>
        <p>Please enter a valid city.</p>
      </div>
    );
  } else {
    content = (
      <div>
        <Today />
        <Forecast />
      </div>
    );
  }

  return (
    <div className="bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-screen overflow-auto">
      <div className="bg-white/25 w-full rounded-lg flex flex-col h-fit p-4">
        <div className="flex flex-col md:flex-row justify-between items-center p-4">
          <Search handleSearch={handleSearch} setLocation={setLocation} />
          <h1 className="mb-8 md:mb-0 order-1 font-poppins text-white text-xl py-2 px-4 italic font-bold">
            Bree Weather App
          </h1>
        </div>

        {content}

        {error && (
          <div className="text-red-200 text-center font-semibold">{error}</div>
        )}

        {data.main && (
          <div className="text-white text-center text-lg mt-4 space-y-1">
            <p>{`${day} ${month}`}</p>

            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].description}
              className="mx-auto"
            />
            <p> {data.main.temp} °C</p>
          </div>
        )}
      </div>
    </div>
  );
}
