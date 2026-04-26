"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  placeholder: string;
}

function SearchInput({ placeholder }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    500,
  );

  return (
    <Input
      placeholder={placeholder}
      onChange={handleSearch}
      defaultValue={searchParams.get("search") || ""}
    />
  );
}

export default SearchInput;
