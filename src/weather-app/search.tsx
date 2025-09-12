import { useState } from "react";
type searchProps = {
  onSearch: (query: string) => void;
  text: string;
};
export default function Search({ onSearch, text }: searchProps) {
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearch(input);
  }
  return (
    <form onSubmit={handleSubmit} className="mt-12">
      <div className="w-full flex px-4 bg-[hsl(243,27%,20%)] py-3 rounded-lg ">
        <img src="./weather-assets/images/icon-search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search for a place..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="w-full font-300 ml-3 text-[1.3rem] bg-[hsl(243,27%,20%)] outline-none "
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 mt-2 rounded-lg font-300 text-[1.2rem] bg-[hsl(233,67%,56%)]"
      >
        Search
      </button>
      <div>{text}</div>
    </form>
  );
}
