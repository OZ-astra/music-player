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

type WeatherResponse = {
  current_weather: {
    [key: string]: number;
  };
  current_weather_units: {
    [key: string]: number;
  };
  hourly: {
    [key: string]: number[];
  };
  daily: {
    [key: string]: number[];
  };
};

type propType = {
  activeUnit: string;
  setActiveUnit: React.Dispatch<React.SetStateAction<string>>;
  dropdown: boolean;
  handleDayDropdown: () => void;
};

export default function APIs({
  activeUnit,
  setActiveUnit,
  dropdown,
  handleDayDropdown,
}: propType) {
  const [location, setLocation] = useState<OpenCageResponse | null>(null);
  const [inputText, setInputText] = useState("");
  const [inputError, setInputError] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  async function handleLocation() {
    try {
      const locationResponse = await fetch("http://ip-api.com/json/");
      const data = await locationResponse.json();

      const latValue = data.lat;
      const lonValue = data.lon;
      setLat(latValue);
      setLon(lonValue);
      try {
        const geoResponse = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latValue}+${lonValue}&key=7fd3a302e7304986853c8cca83bd51be`
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

    if (!input || !input.trim()) {
      setFiltered([]);
      console.warn("Skipping fetch: empty input");
      return;
    }

    try {
      const searchResponse = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          inputText
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
    console.log("Geocode query: ", formatted);

    try {
      const selectResponse = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          formatted
        )}&key=7fd3a302e7304986853c8cca83bd51be`
      );
      const selectData = await selectResponse.json();
      setLocation(selectData);

      if (selectData.results && selectData.results.length > 0) {
        const { lat, lng } = selectData.results[0].geometry;
        setLat(lat);
        setLon(lng);
      } else {
        console.error("No results for:", formatted);
      }
    } catch (error) {
      console.error("failed to fetch details for selected place", error);
    }
  }

  useEffect(() => {
    handleLocation();
  }, []);

  useEffect(() => {
    if (lat === null || lon === null) return;

    async function handleWeather() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,precipitation,windspeed_10m,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode&timezone=auto`;

        const weatherResponse = await fetch(url);
        const weatherData = await weatherResponse.json();
        setWeather(weatherData);
      } catch (error) {
        console.error("oops!!");
      }
    }

    handleWeather();
  }, [lat, lon]);

  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
  });
  console.log(weather);
  console.log("current time:", currentTime);

  function handleWeatherCode(code: number) {
    if (code === 0)
      return <img src="./weather-assets/images/icon-sunny.webp" alt="sunny" />;
    if (code >= 1 && code <= 2)
      return (
        <img
          src="./weather-assets/images/icon-partly-cloudy.webp"
          alt="partly cloudy"
        />
      );
    if (code === 3)
      return (
        <img src="./weather-assets/images/icon-overcast.webp" alt="overcast" />
      );
    if (code >= 45 && code <= 48)
      return <img src="./weather-assets/images/icon-fog.webp" alt="fog" />;
    if (code >= 51 && code <= 55)
      return (
        <img src="./weather-assets/images/icon-drizzle.webp" alt="drizzle" />
      );
    if (code >= 61 && code <= 82)
      return <img src="./weather-assets/images/icon-rain.webp" alt="rain" />;
    if (code >= 71 && code <= 86)
      return <img src="./weather-assets/images/icon-snow.webp" alt="snow" />;
    if (code >= 95 && code <= 99)
      return <img src="./weather-assets/images/icon-storm.webp" alt="storm" />;

    return <img src="./weather-assets/images/icon-loading.svg" alt="loading" />;
  }

  console.log(weather?.hourly.weathercode);
  const hourlyTemp = weather?.hourly?.temperature_2m;
  const dailyTemp = weather?.daily?.temperature_2m;
  const hourlyF = hourlyTemp ?? 0 * 1.8 + 32;
  const dailtF = dailyTemp ?? 0 * 1.8 + 32;

  return (
    <div>
      <Search
        onSearch={handleSearch}
        text={inputText}
        filtered={filtered}
        setFiltered={setFiltered}
        onSelect={handleSelect}
      />
      <div className="bg-[url('./weather-assets/images/bg-today-small.svg')] bg-center bg-no-repeat w-86 h-auto bg-cover rounded-lg mt-8">
        {location && (
          <div className="pt-8">
            <div className="text-center text-[1.8rem] text-white font-[700] leading-[1.1]">
              {inputText === "" ? (
                <p className="leading-0 py-0">
                  <span className="">
                    {location.results[0].components.city},{" "}
                  </span>
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

            <div className="flex justify-between px-3 pt-4">
              <img
                src="./weather-assets/images/icon-sunny.webp"
                className="w-32"
              />
              {weather && (
                <p className={`temp text-[5rem] pr-8 text-white italic`}>
                  {activeUnit === "celsius"
                    ? Math.round(weather.current_weather.temperature)
                    : Math.round(
                        weather.current_weather.temperature * 1.8 + 32
                      )}
                  &deg;
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      {weather && (
        <div className="temp-grid grid grid-cols-2 gap-4 w-[100%] m-auto mt-6">
          <div>
            <p>Feels like</p>
            <p>
              {activeUnit === "celsius"
                ? Math.round(weather.hourly.temperature_2m[0])
                : Math.round(weather.hourly.temperature_2m[0] * 1.8 + 32)}
              &deg;
            </p>
          </div>
          <div>
            <p>Humidity</p>
            <p>{Math.round(weather.hourly.relative_humidity_2m[0])}</p>
          </div>
          <div>
            <p>Wind</p>
            <p>{weather.current_weather.windspeed}</p>
          </div>
          <div>
            <p>Precipitation</p>
            <p>{weather.hourly.precipitation[0]}</p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h1 className="text-white font-600 text-[1.25rem]">Daily forecast</h1>
        <div className="grid grid-cols-3 mt-5 gap-4">
          {weather?.daily?.time?.map((date, index) => {
            return (
              <div key={date} className=" rounded-lg bg-[hsl(243,27%,20%)]">
                <p className="text-center mt-3 font-600 text-[1.2rem] text-white">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <div className="w-14 mx-auto mt-4">
                  {weather.daily?.weathercode
                    ? handleWeatherCode(weather.daily.weathercode[index])
                    : "Loading..."}
                </div>
                <div className="flex justify-between my-4 px-2">
                  <p className=" text-white">
                    {activeUnit === "celsius"
                      ? Math.round(weather.daily.temperature_2m_max[index])
                      : Math.round(
                          weather.daily.temperature_2m_max[index] * 1.8 + 32
                        )}
                    &deg;
                  </p>
                  <p>
                    {activeUnit === "celsius"
                      ? Math.round(weather.daily.temperature_2m_min[index])
                      : Math.round(
                          weather.daily.temperature_2m_min[index] * 1.8 + 32
                        )}
                    &deg;
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 pt-4 px-3 bg-[hsl(243,27%,20%)] rounded-lg">
          <div className="flex justify-between mt-4 items-center">
            <h1 className="text-white font-600 text-[1.3rem]">
              Hourly forecast
            </h1>
            <div className=" flex w-[38%] px-4 py-[0.4rem] text-white justify-between rounded-[5px] bg-[hsl(243,23%,24%)]">
              <p>
                {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
              </p>
              <button onClick={handleDayDropdown} className="">
                <img
                  src="./weather-assets/images/icon-dropdown.svg"
                  alt="dropdown"
                />
              </button>
            </div>
          </div>

          <div>
            <div className="mt-6 flex flex-col gap-4 pb-4 mb-14">
              {(() => {
                const now = new Date();
                const currentHour = new Date(
                  now.getFullYear(),
                  now.getMonth(),
                  now.getDate(),
                  now.getHours()
                );
                const times = weather?.hourly?.time ?? [];

                const startIndex = times.findIndex(
                  (t) => new Date(t).getTime() === currentHour.getTime()
                );

                const next7 =
                  startIndex !== -1
                    ? times.slice(startIndex, startIndex + 7)
                    : [];

                return next7.map((t, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-2 rounded-lg py-3 bg-[hsl(243,23%,24%)]"
                  >
                    <div className="flex items-center">
                      <div className="w-10">
                        {weather?.hourly?.weathercode
                          ? handleWeatherCode(
                              weather?.hourly.weathercode[index]
                            )
                          : "Loading..."}
                      </div>
                      <p className="flex ml-1 font-700 text-[1.27rem] text-white ">
                        {new Date(t).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          hour12: true,
                        })}
                      </p>
                    </div>
                    <p className="pr-4 font-600 text-[1rem]">
                      {activeUnit === "celsius"
                        ? Math.round(
                            weather?.hourly?.temperature_2m[index] ?? 0
                          )
                        : Math.round(
                            (weather?.hourly?.temperature_2m[index] ?? 0) *
                              1.8 +
                              32
                          )}
                      &deg;
                    </p>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
