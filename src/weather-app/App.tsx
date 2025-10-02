import Dropdown from "./dropdown";
import Search from "./search";
import APIs from "./APIs";
import "./styles.css";
import { useState } from "react";

export default function WeatherApp() {
  const [apiError, setApiError] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [searchFound, setSearchFound] = useState(true);

  const [activeUnit, setActiveUnit] = useState(() => {
    const savedUnit = localStorage.getItem("activeUnit");
    return savedUnit ? savedUnit : "celsius";
  });
  const [speedUnit, setSpeedUnit] = useState(() => {
    const savedSpeedUnit = localStorage.getItem("speedUnit");
    return savedSpeedUnit ? savedSpeedUnit : "km/h";
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
          className="focus:border-2 flex w-24 justify-between px-2 py-2 rounded-lg bg-[hsl(243,27%,20%)]"
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
          speedUnit={speedUnit}
          setSpeedUnit={setSpeedUnit}
          dropdown={dropdown}
          handleDropdown={handleDropdown}
        />
      </div>
      {apiError === false ? (
        <div>
          <div className="mt-10">
            <h1 className="md:text-[2.7rem] page-description text-center text-[3.5rem] leading-none text-white font-700 ">
              How's the sky looking today?
            </h1>
          </div>

          <div>
            <APIs
              setApiError={setApiError}
              activeUnit={activeUnit}
              setActiveUnit={setActiveUnit}
              speedUnit={speedUnit}
              dropdown={dropdown}
              dayDropdown={dayDropdown}
              handleDayDropdown={handleDayDropdown}
              setSearchFound={setSearchFound}
              searchFound={searchFound}
            />
          </div>
        </div>
      ) : (
        <div className="mt-16">
          <img
            src="./weather-assets/images/icon-error.svg"
            alt="api error"
            className="w-8 mx-auto"
          />
          <h1 className="api-error font-700 text-[1.8rem] text-center mt-4 text-white">
            Something Went Wrong
          </h1>
          <p className="text-center text-[1.2rem] font-500 mt-3 ">
            We couldn't connect to the server(API error). Please try again in a
            few moments.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 text-white rounded-lg flex gap-2 mx-auto bg-[hsl(243,27%,20%)]"
          >
            <img src="weather-assets/images/icon-retry.svg" alt="retry" />{" "}
            <span>Retry</span>
          </button>
        </div>
      )}
    </div>
  );
}
