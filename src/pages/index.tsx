import { SearchBar } from "@/components/search/searchBar";
import { SearchProvider } from "@/components/search/searchContext";
import { SearchResult } from "@/components/search/searchResult";

export default function Home() {
  return (
    <main className="font-sans flex flex-col p-20 items-center gap-5">
      <h1 className="text-5xl font-bold">Wiki Search</h1>
      <SearchProvider>
        <SearchBar />
        <SearchResult />
      </SearchProvider>
    </main>
  );
}
