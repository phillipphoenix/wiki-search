import { useSearch } from "./searchContext";
import { SearchEntry } from "./searchEntry";

export function SearchResult() {
  const { searchState, results } = useSearch();

  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="text-xl">Search Results</h1>
      {searchState === "isLoading" && <p>Loading...</p>}
      {searchState === "error" && <p>An error occurred...</p>}
      {searchState === "success" && (
        <div className="flex flex-col gap-3">
          {results?.map((res) => (
            <SearchEntry
              key={res.id}
              title={res._formatted?.title || res.title}
              path={res.path}
              description={res._formatted?.content || res.content}
              url={res.url}
            />
          ))}
        </div>
      )}
    </div>
  );
}
