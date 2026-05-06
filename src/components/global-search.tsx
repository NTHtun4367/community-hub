"use client";

import { Search as SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function GlobalSearch() {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    params.delete("page");

    push(`/?${params.toString()}`, { scroll: false });
  }, 500);

  return (
    <div className="relative w-full">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search posts..."
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full bg-muted/50 border-none pl-10 rounded-full h-10 focus-visible:ring-1 focus-visible:ring-primary"
      />
    </div>
  );
}

export default GlobalSearch;
