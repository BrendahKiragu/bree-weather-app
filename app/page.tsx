// import Image from "next/image";
"use client";
import { CiSearch } from "react-icons/ci";
// components
import Daily from "./components/daily";
import Wind from "./components/wind";
import Humidity from "./components/humidity";

export default function Home() {
  return (
    <div>
      <h1>Bree Weather App</h1>
      <aside></aside>

      {/* div1 */}
      <div>
        <input />
        <CiSearch />
        <button>Go</button>

        <div>
          <button>°C</button>
          <button>°F</button>

          <button></button>
        </div>

        {/* div 2 */}
        <Daily />

        {/* div3 */}
        <div>
          <Wind />
          <Humidity />
        </div>
      </div>
    </div>
  );
}
