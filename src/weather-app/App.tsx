import Dropdown from "./dropdown";
import APIs from "./APIs";
import "./styles.css";
import { useState } from "react";

export default function WeatherApp() {
  const [dropdown, setDropdown] = useState(false);

  function handleDropdown() {
    setDropdown((prev) => !prev);
  }
  return (
    <div className="px-3">
      <header className="mt-4 flex justify-between">
        <div className="">
          <img src="./weather-assets/images/logo.svg" className="w-36" />
        </div>
        <button
          onClick={() => {
            handleDropdown();
            console.log(dropdown);
           
            
          }}
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
      {dropdown && (
        <div className="flex justify-end mt-2">
          <Dropdown />
        </div>
      )}
      <div className="mt-10">
        <h1 className=" page-description text-center text-[3.5rem] leading-none text-white font-700 ">
          How's the sky looking today?
        </h1>
      </div>
      <form className="mt-12">
        <div className="w-full flex px-4 bg-[hsl(243,27%,20%)] py-3 rounded-lg ">
          <img src="./weather-assets/images/icon-search.svg" alt="search" />
          <input
            type="text"
            placeholder="Search for a place..."
            className="w-full font-300 ml-3 text-[1.3rem] bg-[hsl(243,27%,20%)] "
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-2 rounded-lg font-300 text-[1.2rem] bg-[hsl(233,67%,56%)]"
        >
          Search
        </button>
        <div>
          <APIs />
        </div>
      </form>
    </div>
  );
}
