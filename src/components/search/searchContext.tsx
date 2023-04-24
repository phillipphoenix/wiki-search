import { WikiPageResult } from "@/pages/api/search";
import { SearchResponse } from "meilisearch";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";

export type SearchContextType = {
  query: string;
  setQuery: (query: string) => void;
  results: WikiPageResult[];
  searchState: "idle" | "isLoading" | "error" | "success";
};

const defaultValue: SearchContextType = {
  query: "",
  setQuery: () => {},
  results: [],
  searchState: "idle",
};

const SearchContext = createContext<SearchContextType>(defaultValue);

const fetcher: <T>(...args: any[]) => Promise<T> = async (...args) => {
  const res = await fetch(...args);
  return res.json();
};

export const SearchProvider = ({ children }: { children: ReactNode[] }) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<WikiPageResult[]>([]);
  const [searchState, setSearchState] = useState<
    "idle" | "isLoading" | "error" | "success"
  >("idle");

  const { data, error, isLoading } = useSWR<SearchResponse<WikiPageResult>>(
    `/api/search?q=${query}`,
    fetcher
  );

  useEffect(() => {
    if (isLoading) {
      setSearchState("isLoading");
    } else {
      if (error) {
        setSearchState("error");
      } else {
        if (data) {
          console.log("Results: ", data);
          setResults(data.hits);
          setSearchState("success");
        }
      }
    }
  }, [data, error, isLoading]);

  return (
    <SearchContext.Provider value={{ query, setQuery, results, searchState }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
