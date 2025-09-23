import { useState } from "react";

type propType = {
  activeUnit: string;
  setActiveUnit: React.Dispatch<React.SetStateAction<string>>;
  dropdown: boolean;
  dayDropdown: boolean;
  handleDropdown: () => void;
};
export default function Dropdown({
  activeUnit,
  setActiveUnit,
  dropdown,
  dayDropdown,
  handleDropdown,
}: propType) {
  const daysOfWeek = [
    " Monday",
    " Teusday",
    "Wednesday",
    "Thursday",
    " Friday",
    "Saturday",
    "Sunday",
  ];
  const currentDate = new Date();
  const currentDay = daysOfWeek[currentDate.getDay() - 1];

  const [today, setToday] = useState("");

  const [speedUnit, setSpeedUnit] = useState(() => {
    const savedSpeedUnit = localStorage.getItem("speedUnit");
    return savedSpeedUnit ? savedSpeedUnit : "km/h";
  });

  function handleActiveUnit(temperature: string) {
    setActiveUnit(temperature);
    localStorage.setItem("activeUnit", temperature);
  }

  function handleSpeedUnit(speed: string) {
    setSpeedUnit(speed);
    localStorage.setItem("speedUnit", speed);
  }

  return (
    <div className="absolute z-10 border">
      {dropdown && (
        <div className=" w-[210px] bg-[hsl(243,27%,20%)] px-2 mx-3 rounded-lg border border-[hsl(252,17%,35%)]">
          <div className="font-[300] pt-3">
            <h6 className="text-white text-[1rem]">
              Switch to {activeUnit === "celsius" ? "Imperial" : "Metric"}
            </h6>
            <p className="text-[0.87rem] mt-4">Temperature</p>
            <button
              onClick={() => handleActiveUnit("celsius")}
              className={`mt-2 text-white text-[1rem] ${
                activeUnit === "celsius"
                  ? "w-full flex justify-between rounded-lg px-2 py-[6px] bg-[hsl(243,23%,24%)] "
                  : ""
              }`}
            >
              Celsius( &deg;C)
              {activeUnit === "celsius" && (
                <img src="./weather-assets/images/icon-checkmark.svg" />
              )}
            </button>
            <button
              onClick={() => handleActiveUnit("fahrenheit")}
              className={`mt-1 text-white text-[1rem] ${
                activeUnit === "fahrenheit"
                  ? " w-full flex justify-between rounded-lg px-2 py-[6px] mt-2 bg-[hsl(243,23%,24%)] "
                  : ""
              }`}
            >
              <span> Fahrenheit (&deg;F)</span>
              {activeUnit === "fahrenheit" && (
                <img src="./weather-assets/images/icon-checkmark.svg" />
              )}
            </button>
            <hr className="mt-2 border-t-[0.2px] border-[hsl(252,17%,35%)]" />
            <p className="text-[0.87rem] mt-3">Wind Speed</p>
            <button
              onClick={() => handleSpeedUnit("km/h")}
              className={`mt-1 text-white text-[1rem]${
                speedUnit === "km/h"
                  ? " w-full flex justify-between rounded-lg px-2 py-2 -mb-4 bg-[hsl(243,23%,24%)] "
                  : ""
              }`}
            >
              <span>km/h</span>
              {speedUnit === "km/h" && (
                <img src="./weather-assets/images/icon-checkmark.svg" />
              )}
            </button>
            <br />
            <button
              onClick={() => handleSpeedUnit("mph")}
              className={`mt-1 text-white text-[1rem] ${
                speedUnit === "mph"
                  ? " w-full flex justify-between rounded-lg px-2 py-2 bg-[hsl(243,23%,24%)] "
                  : ""
              }`}
            >
              <span>mph</span>
              {speedUnit === "mph" && (
                <img src="./weather-assets/images/icon-checkmark.svg" />
              )}
            </button>
            <hr className="mt-2 border-t-[0.2px] border-[hsl(252,17%,35%)]" />
            <p className="text-[0.87rem] mt-3">Precipitation</p>
            <button className="mt-1 text-white text-[1rem] mb-7 w-full flex justify-between rounded-lg px-2 py-2 bg-[hsl(243,23%,24%)] ">
              <span> Millimeters(mm)</span>
              <img src="./weather-assets/images/icon-checkmark.svg" />
            </button>
          </div>
        </div>
      )}
      {dayDropdown && (
        <div className=" w-[210px] bg-[hsl(243,27%,20%)] px-2 -ml-1 rounded-lg -mt-6 border border-[hsl(252,17%,35%)]">
          <div className="font-[300] pt-3 pb-5">
            {daysOfWeek.map((day, index) => {
              return (
                <button
                  key={index}
                  className={`mt-3 block text-white text-[1.1rem] ${
                    currentDay === day
                      ? " w-full rounded-lg text-start pl-2 py-[6px] bg-[hsl(243,23%,24%)]"
                      : ""
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
