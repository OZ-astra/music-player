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

  useEffect(() => {
    async function handleLocation() {
      try {
        const locationResponse = await fetch("http://ip-api.com/json/");
        const data = await locationResponse.json();
        const lat = data.lat;
        const lon = data.lon;
        console.log(lat, lon);
        try {
          const geoResponse = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=7fd3a302e7304986853c8cca83bd51be`
          );
          const geoData = await geoResponse.json();
          console.log(geoData);
          setLocation(geoData);
        } catch (error) {
          console.error("oops!! geocoding went bad");
        }
      } catch (error) {
        console.error(error);
      }
    }
    handleLocation();
  }, []);

  async function handleSearch(input: string) {
    try {
      const searchResponse = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          input
        )}&key=7fd3a302e7304986853c8cca83bd51be`
      );
      const searchData = await searchResponse.json();
      const formatted = searchData.results[0].formatted;
      const { lat, lng } = searchData.results[0].geometry;
      setInputText(formatted);
    } catch (error) {
      console.error("something went wrong with searchData");
      if (error instanceof Error) {
        setInputError(error.message);
      } else {
        setInputError(String(error));
      }
    }
  }

  const currentDate = new Date();
  console.log(currentDate);

  return (
    <div>
      <Search onSearch={handleSearch} text={inputText} />
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
