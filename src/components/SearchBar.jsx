import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!value.trim()) return;

    onSearch(value.trim());
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#241b13]/25 bg-[#f4ead7] p-2 shadow-[6px_6px_0_rgba(36,27,19,0.12)]"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center border border-[#241b13]/20 bg-[#eadcc5] text-xl">
          ⌕
        </div>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search city"
          className="h-12 flex-1 bg-transparent px-3 text-sm text-[#241b13] outline-none placeholder:text-[#241b13]/45"
        />

        <button
          type="submit"
          className="h-12 border border-[#241b13] bg-[#241b13] px-5 text-sm font-bold uppercase tracking-[0.16em] text-[#f4ead7] transition hover:bg-[#3a2a1d] active:scale-95"
        >
          Search
        </button>
      </div>
    </form>
  );
}