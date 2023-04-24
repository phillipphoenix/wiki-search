import { useSearch } from "./searchContext";

export function SearchBar() {
  const { setQuery } = useSearch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value || "");
  };

  return (
    <div>
      <div className="flex">
        <input
          id="query"
          name="query"
          className="rounded-md px-3 py-2 text-lg min-w-[400px]"
          type="text"
          placeholder="Search for wiki page..."
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
