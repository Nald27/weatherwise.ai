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
      className="w-full border border-[#241b13]/25 bg-[#f4ead7] p-2 shadow-[5px_5px_0_rgba(36,27,19,0.12)] sm:shadow-[6px_6px_0_rgba(36,27,19,0.12)]"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#241b13]/20 bg-[#eadcc5] text-lg sm:h-12 sm:w-12">
            ⌕
          </div>

          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search city"
            className="h-11 min-w-0 flex-1 bg-transparent px-2 text-sm text-[#241b13] outline-none placeholder:text-[#241b13]/45 sm:h-12 sm:px-3"
          />
        </div>

        <button
          type="submit"
          className="h-11 w-full border border-[#241b13] bg-[#241b13] px-5 text-sm font-bold uppercase tracking-[0.14em] text-[#f4ead7] transition hover:bg-[#3a2a1d] active:scale-95 sm:h-12 sm:w-auto sm:tracking-[0.16em]"
        >
          Search
        </button>
      </div>
    </form>
  );
}