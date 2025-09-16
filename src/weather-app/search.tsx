import { useState } from "react";
type searchProps = {
  onSearch: (query: string) => void;
  onSelect: (value: string) => void;
  text: string;
  filtered: string[];
};
export default function Search({
  onSearch,
  onSelect,
  text,
  filtered,
}: searchProps) {
  const [input, setInput] = useState(text);
  const [selected, setSelected] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (filtered.length > 0) {
      onSearch(input);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  }
  return (
    <form onSubmit={handleSubmit} className="mt-12 relative">
      <div className="w-full flex px-4 bg-[hsl(243,27%,20%)] py-3 rounded-lg ">
        <img src="./weather-assets/images/icon-search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search for a place..."
          value={input}
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

      {input && (
        <ul
          className={`${
            text === ""
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
                  className="mt-2 ml-3"
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
