"use client";

import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Models } from "node-appwrite";
import { getFiles } from "@/lib/actions/file.action";
import Thumbnail from "./Thumbnail";
import FromattedDateTime from "./FromattedDateTime";
import { useDebounce } from "use-debounce";

const Search: FC = ({}) => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query, 500);

  const handleClickItem = (file: Models.Document) => {
    setResults([]);
    setOpen(false);

    router.push(
      `/${file.type === "video" || file.type === "audio" ? "media" : file.type + "s"}?query=${query}`
    );
  };

  useEffect(() => {
    const fetchFiles = async () => {
      console.log("fetchFiles: ", debouncedQuery);
      if (debouncedQuery.length === 0) {
        setOpen(false);
        setResults([]);
        return router.replace(path.replace(searchParams.toString(), ""));
      }

      setLoading(true);
      try {
        const files = await getFiles({ types: [], searchText: debouncedQuery });
        setResults(files.documents);
        setOpen(true);
      } catch (error) {
        console.log("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [debouncedQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  return (
    <div className="w-full max-w-[800px] mr-4">
      <div className="relative">
        <Image
          className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          src="/assets/search.svg"
          alt="search"
          width={24}
          height={24}
        />
        <Input
          placeholder="Search"
          className="pl-12"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {/* Dropdown */}
      {open && (
        <ul className="absolute z-50 w-full max-w-[800px] mt-2 bg-white border border-gray-200 rounded-xl shadow-md p-2 max-h-64 overflow-auto">
          {loading ? (
            <li className="text-gray-500 px-2 py-1">Searching...</li>
          ) : results.length > 0 ? (
            results.map((file) => (
              <li
                key={file.$id}
                className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer flex justify-between items-center"
                onClick={() => handleClickItem(file)}
              >
                <div className="flex cursor-pointer items-center gap-4">
                  <Thumbnail
                    type={file.type}
                    extension={file.extension}
                    url={file.url}
                    className="size-9 min-w-9"
                  />
                  <p className="line-clamp-1 text-light-100">{file.name}</p>
                </div>
                <FromattedDateTime
                  date={file.$createdAt}
                  className="line-clamp-1 text-light-200"
                />
              </li>
            ))
          ) : (
            <li className="text-gray-500 px-2 py-1">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
