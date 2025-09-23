import Dropdown from "./dropdown";
import Search from "./search";
import APIs from "./APIs";
import "./styles.css";
import { useState } from "react";

export default function WeatherApp() {
  const [dropdown, setDropdown] = useState(false);
  const [activeUnit, setActiveUnit] = useState(() => {
    const savedUnit = localStorage.getItem("activeUnit");
    return savedUnit ? savedUnit : "celsius";
  });
  const [dayDropdown, setDayDropdown] = useState(false);

  function handleDropdown() {
    setDropdown((prev) => !prev);
  }

  function handleDayDropdown() {
    setDayDropdown((prev) => !prev);
  }

  return (
    <div className="px-3">
      <header className="mt-4 flex justify-between">
        <div className="">
          <img src="./weather-assets/images/logo.svg" className="w-36" />
        </div>
        <button
          onClick={() => handleDropdown()}
          className="flex w-24 justify-between px-2 py-2 rounded-lg bg-[hsl(243,27%,20%)]"
        >
          <img
            src="./weather-assets/images/icon-units.svg"
            alt="setting"
            className="w-4"
          />
          <p className="units text-white">Units</p>
          <img
            src="./weather-assets/images/icon-dropdown.svg"
            alt="dropdown"
            className="w-3"
          />
        </button>
      </header>

      <div className="flex justify-end mt-2">
        <Dropdown
          activeUnit={activeUnit}
          setActiveUnit={setActiveUnit}
          dropdown={dropdown}
          dayDropdown={dayDropdown}
          handleDropdown={handleDropdown}
        />
      </div>
      <div className="mt-10">
        <h1 className=" page-description text-center text-[3.5rem] leading-none text-white font-700 ">
          How's the sky looking today?
        </h1>
      </div>

      <div>
        <APIs
          activeUnit={activeUnit}
          setActiveUnit={setActiveUnit}
          dropdown={dropdown}
          handleDayDropdown={handleDayDropdown}
        />
      </div>
    </div>
  );
}
