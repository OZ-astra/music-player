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
  setApiError: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveUnit: React.Dispatch<React.SetStateAction<string>>;
  speedUnit: string;
  dropdown: boolean;
  dayDropdown: boolean;
  handleDayDropdown: () => void;
  setSearchFound: React.Dispatch<React.SetStateAction<boolean>>;
  searchFound: boolean;
};

export default function APIs({
  setApiError,
  activeUnit,
  speedUnit,
  dayDropdown,
  handleDayDropdown,
  setSearchFound,
  searchFound,
}: propType) {
  const [location, setLocation] = useState<OpenCageResponse | null>(null);
  const [inputText, setInputText] = useState("");

  const [filtered, setFiltered] = useState<string[]>([]);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
  });
  const [toggleDay, setToggleDay] = useState(() => {
    const currentDay = daysOfWeek[currentDate.getDay() - 1];
    return currentDay;
  });

  function handleDayToggle(day: string) {
    setToggleDay(day);
  }
  async function handleLocation() {
    try {
      const locationResponse = await fetch("https://ipapi.co/json/");
      const data = await locationResponse.json();

      const latValue = data.latitude;
      const lonValue = data.longitude;
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
        setApiError(true);
      }
    } catch (error) {
      console.error(error);
      setApiError(true);
    } finally {
      setLoading(false);
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
      setFiltered([]);
      setApiError(true);
    } finally {
      setLoading(false);
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

      if (selectData.results && selectData.results.length > 0) {
        const { lat, lng } = selectData.results[0].geometry;
        setLat(lat);
        setLon(lng);
      } else {
        console.error("No results for:", formatted);
      }
    } catch (error) {
      console.error("failed to fetch details for selected place", error);
      setApiError(true);
    } finally {
      setLoading(false);
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
        setApiError(true);
      } finally {
        setLoading(false);
      }
    }

    handleWeather();
  }, [lat, lon]);

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

  return (
    <div>
      <Search
        onSearch={handleSearch}
        text={inputText}
        filtered={filtered}
        setFiltered={setFiltered}
        onSelect={handleSelect}
        location={location}
        inputText={inputText}
        setSearchFound={setSearchFound}
      />

      {!searchFound && (
        <div className="text-center mt-8 font-600 text-[1.8rem] text-white not-found">
          No search result found
        </div>
      )}

      {searchFound && (
        <>
          <div className="md:px-6 md:flex md:justify-between md:gap-8 md:w-[100%] mx-auto p-0">
            <section className="md:w-[63%] lg:w-[68%]">
              {loading ? (
                <div className="bg-[hsl(243,27%,20%)] h-[70vw] rounded-lg flex justify-center items-center flex-col mt-8">
                  <img
                    src="./weather-assets/images/icon-loading.svg"
                    alt="loading"
                    className="w-16"
                  />
                  <p className="font-600 text-[1.2rem]">Loading</p>
                </div>
              ) : (
                location && (
                  <div className=" h-auto bg-[url('./weather-assets/images/bg-today-small.svg')] md:bg-[url('./weather-assets/images/bg-today-large.svg')] bg-center bg-no-repeat w-86 bg-cover rounded-lg mt-8">
                    <div className="pt-8">
                      <div className="text-center text-[1.8rem] text-white font-[700] leading-[1.1]">
                        {inputText === "" ? (
                          <p className="leading-0 py-0">
                            <span>
                              {location?.results[0].components.city},{" "}
                            </span>
                            <span>
                              {location?.results[0].components.country}
                            </span>
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
                          <p className="temp text-[5rem] pr-8 text-white italic">
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
                  </div>
                )
              )}

              <div className=" md:flex temp-grid grid grid-cols-2 md:gap-2 gap-4 w-[100%] m-auto mt-6">
                <div>
                  <p>Feels like</p>
                  {weather ? (
                    <p>
                      {activeUnit === "celsius"
                        ? Math.round(weather.hourly.temperature_2m[0])
                        : Math.round(
                            weather.hourly.temperature_2m[0] * 1.8 + 32
                          )}
                      &deg;
                    </p>
                  ) : (
                    <p>-</p>
                  )}
                </div>
                <div>
                  <p>Humidity</p>
                  {weather ? (
                    <p>{Math.round(weather.hourly.relative_humidity_2m[0])}%</p>
                  ) : (
                    <p>-</p>
                  )}
                </div>
                <div>
                  <p>Wind</p>
                  {weather ? (
                    <p>
                      {speedUnit === "km/h"
                        ? Math.round(weather.current_weather.windspeed) +
                          " km/h"
                        : Math.round(
                            weather.current_weather.windspeed * 0.621371
                          ) + " mph"}
                    </p>
                  ) : (
                    <p>-</p>
                  )}
                </div>
                <div>
                  <p>Precipitation</p>
                  {weather ? (
                    <p>
                      {activeUnit === "celsius"
                        ? weather.hourly.precipitation[0] + " mm"
                        : weather.hourly.precipitation[0] / 25.4 + " in"}
                    </p>
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </div>

              <div className="mt-6 md:mt-8">
                <h1 className="text-white font-600 text-[1.25rem] md:text-[1rem]">
                  Daily forecast
                </h1>

                {loading && (
                  <div className=" mt-5 gap-4 w-full ">
                    {daysOfWeek.map((d, indx) => {
                      return (
                        <div
                          key={indx}
                          className="rounded-lg py-[5rem] bg-[hsl(243,27%,20%)]"
                        ></div>
                      );
                    })}
                  </div>
                )}
                <div className="daily-grid grid grid-cols-3 mt-5 gap-4 md:flex md:gap-2">
                  {weather?.daily?.time?.map((date, index) => {
                    return (
                      <div
                        key={date}
                        className="md:flex md:flex-col flex-grow rounded-lg bg-[hsl(243,27%,20%)]"
                      >
                        <p className="md:text-[0.8rem] text-center mt-3 font-600 text-[1.2rem] text-white">
                          {new Date(date).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </p>

                        <div className="w-14 mx-auto mt-4 md:w-8">
                          {weather.daily?.weathercode
                            ? handleWeatherCode(
                                weather.daily.weathercode[index]
                              )
                            : ""}
                        </div>
                        <div className="flex justify-between my-4 px-2 md:text-[0.8rem]">
                          <p className=" text-white">
                            {activeUnit === "celsius"
                              ? Math.round(
                                  weather.daily.temperature_2m_max[index]
                                )
                              : Math.round(
                                  weather.daily.temperature_2m_max[index] *
                                    1.8 +
                                    32
                                )}
                            &deg;
                          </p>
                          <p>
                            {activeUnit === "celsius"
                              ? Math.round(
                                  weather.daily.temperature_2m_min[index]
                                )
                              : Math.round(
                                  weather.daily.temperature_2m_min[index] *
                                    1.8 +
                                    32
                                )}
                            &deg;
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
            <section className=" md:w-[30%]">
              <div className=" md:w-[100%] mt-8 pt-4 px-3 bg-[hsl(243,27%,20%)] rounded-lg">
                <div className="flex justify-between mt-4 items-center ">
                  <h1
                    className="text-white font-600 text-[1.3rem] 
                      md:text-[1rem]"
                  >
                    Hourly forecast
                  </h1>
                  <div className="flex w-[38%] md:w-[50%] px-4 py-[0.4rem] justify-center text-white rounded-[5px] bg-[hsl(243,23%,24%)]">
                    <p className="-ml-4 md:text-[0.9rem]">
                      {loading === false ? toggleDay : "-"}
                    </p>
                    <button
                      onClick={handleDayDropdown}
                      className="ml-2 w-[4vw] md:w-[7vw]"
                    >
                      <img
                        src="./weather-assets/images/icon-dropdown.svg"
                        alt="dropdown"
                      />
                    </button>
                  </div>
                </div>

                {loading && (
                  <div className="mt-4">
                    {daysOfWeek.map((d, indx) => {
                      return (
                        <div
                          key={indx}
                          className=" mt-3 px-2 rounded-lg py-7 bg-[hsl(243,23%,24%)]"
                        >
                          {}
                        </div>
                      );
                    })}
                  </div>
                )}

                {dayDropdown && (
                  <div className="absolute z-20 flex justify-end w-[85%] mt-3 md:w-[26vw]">
                    <div className=" md:w-[170px] w-[210px] bg-[hsl(243,27%,20%)] px-2 -ml-1 rounded-lg border border-[hsl(252,17%,35%)]">
                      <div className="font-[300] pt-3 pb-5">
                        {daysOfWeek.map((day, index) => {
                          return (
                            <div key={index}>
                              <button
                                onClick={() => handleDayToggle(day)}
                                key={day}
                                className={`mt-3 block text-white text-[1.1rem] md:text-[0.9rem] ${
                                  toggleDay === day
                                    ? " w-full rounded-lg text-start pl-2 py-[6px] bg-[hsl(243,23%,24%)]"
                                    : ""
                                }`}
                              >
                                {loading === false ? day : " "}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <div className="mt-6 flex flex-col gap-4 pb-4 mb-14 md:mb-5">
                    {(() => {
                      if (!weather?.hourly) return;
                      const timing = weather.hourly.time ?? [];
                      const temps = weather.hourly.temperature_2m ?? [];
                      const codes = weather.hourly.weathercode ?? [];
                      const forecastByDay = timing.reduce(
                        (acc: Record<string, any[]>, t, index) => {
                          const d = new Date(t);
                          const dayName = daysOfWeek[d.getDay()];
                          if (!dayName) return acc;
                          if (!acc[dayName]) acc[dayName] = [];
                          acc[dayName].push({
                            time: d,
                            temperature: temps[index],
                            weathercode: codes[index],
                          });
                          return acc;
                        },
                        {}
                      );
                      const selectedForecast = forecastByDay[toggleDay] ?? [];
                      const next7 = selectedForecast.slice(0, 7);

                      return next7.map((hour, id) => (
                        <div key={id}>
                          <div className="flex items-center justify-between px-2 rounded-lg py-3 md:py-2  bg-[hsl(243,23%,24%)]">
                            <div className=" w-full flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-10 md:w-8">
                                  {handleWeatherCode(hour.weathercode)}
                                </div>
                                <p className=" md:text-[1rem] flex ml-1 font-700 text-[1.27rem] text-white ">
                                  {hour?.time.toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    hour12: true,
                                  })}
                                </p>
                              </div>
                              <p className="pr-4 font-600 text-[1rem] md:text-[0.8rem]">
                                {activeUnit === "celsius"
                                  ? Math.round(hour.temperature)
                                  : Math.round(
                                      hour.temperature * 1.8 + 32
                                    )}{" "}
                                &deg;
                              </p>
                            </div>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
