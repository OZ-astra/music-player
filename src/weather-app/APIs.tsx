import { useEffect, useState } from "react";
import Search from "./search";

type OpenCageResult = {
  formatted: string;
  components: {
    city?: string;
    state?: string;
    country?: string;
    country_code?: string;
    [key: string]: any;
  };
  geometry: {
    lat: number;
    lng: number;
  };
};

type OpenCageResponse = {
  results: OpenCageResult[];
  status: {
    code: number;
    message: string;
  };
  total_results: number;
};

export default function APIs() {
  const [location, setLocation] = useState<OpenCageResponse | null>(null);
  const [inputText, setInputText] = useState("");
  const [inputError, setInputError] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);

  async function handleLocation() {
    try {
      const locationResponse = await fetch("http://ip-api.com/json/");
      const data = await locationResponse.json();
      const lat = data.lat;
      const lon = data.lon;
      try {
        const geoResponse = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=7fd3a302e7304986853c8cca83bd51be`
        );
        const geoData = await geoResponse.json();
        setLocation(geoData);
      } catch (error) {
        console.error("oops!! geocoding went bad");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSearch(input: string) {
    setInputText(input);

    if (!input.trim()) {
      setFiltered([]);
      return;
    }

    try {
      const searchResponse = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          input
        )}&key=7fd3a302e7304986853c8cca83bd51be`
      );
      const searchData = await searchResponse.json();

      const results = ((searchData.results as OpenCageResult[]) ?? [])
        .map((r: OpenCageResult) => r.formatted)
        .filter(Boolean);
      setFiltered(results);
    } catch (error) {
      console.error("something went wrong with searchData");
      if (error instanceof Error) {
        setInputError(error.message);
      } else {
        setInputError(String(error));
        setFiltered([]);
      }
    }
  }

  async function handleSelect(formatted: string) {
    setInputText(formatted);
    setFiltered([]);

    try {
      const selectResponse = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          formatted
        )}&key=7fd3a302e7304986853c8cca83bd51be`
      );
      const selectData = await selectResponse.json();
      setLocation(selectData);
    } catch (error) {
      console.error("failed to fetch details for selected place", error);
    }
  }

  useEffect(() => {
    handleLocation();
  }, []);

  const currentDate = new Date();

  return (
    <div>
      <Search
        onSearch={handleSearch}
        text={inputText}
        filtered={filtered}
        onSelect={handleSelect}
      />
      <div className="bg-[url('./weather-assets/images/bg-today-small.svg')] bg-no-repeat w-full h-[100vh] my-8">
        {location && (
          <div className="pt-10">
            <div className="text-center text-[1.8rem] text-white font-[700]">
              {inputText === "" ? (
                <p>
                  <span>{location.results[0].components.city}, </span>
                  <span>{location.results[0].components.country}</span>
                </p>
              ) : (
                <span>{inputText}</span>
              )}
            </div>
            <p className="text-center mt-2 text-[1rem] font-[500]">
              {currentDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <div>
              <img
                src="./weather-assets/images/icon-sunny.webp"
                className="w-32"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
