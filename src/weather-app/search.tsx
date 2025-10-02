import { useState } from "react";

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

type searchProps = {
  onSearch: (query: string) => void;
  onSelect: (value: string) => void;
  text: string;
  filtered: string[];
  setFiltered: React.Dispatch<React.SetStateAction<string[]>>;
  location: OpenCageResponse | null;
  inputText: string;
  setSearchFound: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Search({
  onSearch,
  onSelect,
  text,
  filtered,
  setFiltered,
  location,
  inputText,
  setSearchFound,
}: searchProps) {
  const [input, setInput] = useState(text);
  const [activeIndex, setActiveIndex] = useState(-1);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
    setActiveIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (filtered.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? filtered.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const trimmedInput = input.trim();
      if (!trimmedInput) return;
      if (activeIndex >= 0) {
        setInput(filtered[activeIndex]);
        onSelect(filtered[activeIndex]);
        setFiltered([]);
        setActiveIndex(-1);
      } else {
        onSearch(trimmedInput);
      }
    } else if (e.key === "Escape") {
      setActiveIndex(-1);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedInput = input.trim();
    setInput("");
    if (!trimmedInput) return;
    if (location?.results[0].formatted !== inputText) {
      setSearchFound(false);
    } else {
      setSearchFound(true);
    }

    if (activeIndex >= 0) {
      setInput(filtered[activeIndex]);
      onSelect(filtered[activeIndex]);
      setFiltered([]);
    } else {
      onSearch(trimmedInput);
    }
  }

  const isOpen = filtered.length > 0;

  return (
    <form onSubmit={handleSubmit} className="mt-12 relative">
      <div className="md:flex md:w-[600px] md:mx-auto md:gap-4 items-center  ">
        <div className="focus-within:outline outline-white outline-offset-4 w-full md:py-[1rem] lg:py-[1.2rem] md:w-[70%] flex px-4 bg-[hsl(243,27%,20%)] py-3 rounded-lg ">
          <img
            src="./weather-assets/images/icon-search.svg"
            alt="search"
            className="md:w-4"
          />
          <input
            type="text"
            placeholder="Search for a place..."
            value={input ?? ""}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            className="w-full font-300 ml-3 text-[1.3rem] md:text-[0.9rem] bg-[hsl(243,27%,20%)] outline-none "
          />
        </div>
        <button
          type="submit"
          className="md:w-[20%] w-full py-3 md:py-[1rem] mt-2 rounded-lg font-300 text-[1.2rem] md:text-[1rem] focus:outline outline-[hsl(233,67%,56%)] outline-offset-2 bg-[hsl(233,67%,56%)]"
        >
          Search
        </button>
      </div>

      {isOpen && (
        <ul
          className={`${
            activeIndex === -1 && text === ""
              ? ""
              : "border-4 rounded-lg bg-[hsl(243,27%,20%)] text-white py-4 absolute z-2 w-[100%] top-[4rem]"
          }`}
        >
          {filtered.length > 0
            ? filtered.map((format, index) => (
                <li
                  key={index}
                  onClick={() => {
                    onSelect(format);
                    setInput("");
                  }}
                  className={`mt-2 ml-3 ${
                    index === activeIndex
                      ? "border border-[hsl(243,23%,30%)] bg-[hsl(243,23%,24%)] mr-2 pl-2 py-2 rounded-lg"
                      : ""
                  }`}
                >
                  {format}
                </li>
              ))
            : ""}
        </ul>
      )}
    </form>
  );
}
