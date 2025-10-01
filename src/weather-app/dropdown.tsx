import { useState } from "react";

type propType = {
  activeUnit: string;
  setActiveUnit: React.Dispatch<React.SetStateAction<string>>;
  speedUnit: string;
  setSpeedUnit: React.Dispatch<React.SetStateAction<string>>;
  dropdown: boolean;
  handleDropdown: () => void;
};
export default function Dropdown({
  activeUnit,
  setActiveUnit,
  speedUnit,
  setSpeedUnit,
  dropdown,
}: propType) {
  function handleActiveUnit(temperature: string) {
    setActiveUnit(temperature);
    localStorage.setItem("activeUnit", temperature);
  }

  function handleSpeedUnit(speed: string) {
    setSpeedUnit(speed);
    localStorage.setItem("speedUnit", speed);
  }

  return (
    <div className="absolute z-10">
      {dropdown && (
        <div className=" w-[180px] bg-[hsl(243,27%,20%)] px-2 mx-3 rounded-lg border border-[hsl(252,17%,35%)]">
          <div className="font-[300] pt-3">
            <h6 className="focus text-white text-[0.8rem]">
              Switch to {activeUnit === "celsius" ? "Imperial" : "Metric"}
            </h6>
            <p className="text-[0.7rem] mt-4">Temperature</p>
            <button
              onClick={() => handleActiveUnit("celsius")}
              className={`mt-2 text-white text-[0.8rem] ${
                activeUnit === "celsius"
                  ? "w-full flex justify-between rounded-lg px-2 py-[6px] bg-[hsl(243,23%,24%)] "
                  : ""
              }`}
            >
              Celsius( &deg;C)
              {activeUnit === "celsius" && (
                <img
                  src="./weather-assets/images/icon-checkmark.svg"
                  className="w-3"
                />
              )}
            </button>
            <button
              onClick={() => handleActiveUnit("fahrenheit")}
              className={`mt-1 text-white text-[0.8rem]${
                activeUnit === "fahrenheit"
                  ? " w-full flex justify-between rounded-lg px-2 py-[6px] mt-2 bg-[hsl(243,23%,24%)] "
                  : ""
              }`}
            >
              <span> Fahrenheit (&deg;F)</span>
              {activeUnit === "fahrenheit" && (
                <img
                  src="./weather-assets/images/icon-checkmark.svg"
                  className="w-3"
                />
              )}
            </button>
            <hr className="mt-2 border-t-[0.2px] border-[hsl(252,17%,35%)]" />
            <p className="text-[0.7rem] mt-3">Wind Speed</p>
            <button
              onClick={() => handleSpeedUnit("km/h")}
              className={`mt-1 text-white text-[0.8rem]${
                speedUnit === "km/h"
                  ? " w-full flex justify-between rounded-lg px-2 py-2 -mb-4 bg-[hsl(243,23%,24%)] "
                  : ""
              }`}
            >
              <span>km/h</span>
              {speedUnit === "km/h" && (
                <img
                  src="./weather-assets/images/icon-checkmark.svg"
                  className="w-3"
                />
              )}
            </button>
            <br />
            <button
              onClick={() => handleSpeedUnit("mph")}
              className={`mt-1 text-white text-[0.8rem]${
                speedUnit === "mph"
                  ? " w-full flex justify-between rounded-lg px-2 py-2 bg-[hsl(243,23%,24%)] "
                  : ""
              }`}
            >
              <span>mph</span>
              {speedUnit === "mph" && (
                <img
                  src="./weather-assets/images/icon-checkmark.svg"
                  className="w-3"
                />
              )}
            </button>
            <hr className="mt-2 border-t-[0.2px] border-[hsl(252,17%,35%)]" />
            <p className="text-[0.7rem] mt-3">Precipitation</p>
            <button className="mt-1 text-white text-[0.8rem] mb-7 w-full flex justify-between rounded-lg px-2 py-2 bg-[hsl(243,23%,24%)] ">
              <span> Millimeters(mm)</span>
              <img
                src="./weather-assets/images/icon-checkmark.svg"
                className="w-3"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
