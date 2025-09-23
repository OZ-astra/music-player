import { useState } from "react";
type searchProps = {
  onSearch: (query: string) => void;
  onSelect: (value: string) => void;
  text: string;
  filtered: string[];
  setFiltered: React.Dispatch<React.SetStateAction<string[]>>;
};
export default function Search({
  onSearch,
  onSelect,
  text,
  filtered,
  setFiltered,
}: searchProps) {
  const [input, setInput] = useState(text);
  const [selected, setSelected] = useState("");
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
    if (!trimmedInput) return;

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
      <div className="w-full flex px-4 bg-[hsl(243,27%,20%)] py-3 rounded-lg ">
        <img src="./weather-assets/images/icon-search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search for a place..."
          value={input ?? ""}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          className="w-full font-300 ml-3 text-[1.3rem] bg-[hsl(243,27%,20%)] outline-none "
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 mt-2 rounded-lg font-300 text-[1.2rem] bg-[hsl(233,67%,56%)]"
      >
        Search
      </button>

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

      {selected && <p>You selected: {selected}</p>}
    </form>
  );
}
