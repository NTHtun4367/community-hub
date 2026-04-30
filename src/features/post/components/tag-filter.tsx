"use client";

import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

function TagFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeTag = searchParams.get("tag");

  if (!activeTag) return null;

  const handleRemove = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tag");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2 my-4">
      <span className="text-sm text-muted-foreground font-medium">
        Filtered by:
      </span>
      <Badge variant="secondary" className="flex items-center gap-1 py-1 px-2">
        #{activeTag}
        <button
          type="button"
          onClick={handleRemove}
          className="ml-1 hover:text-destructive transition-colors"
          aria-label="Remove tag filter"
        >
          <X className="w-3 h-3" />
        </button>
      </Badge>
    </div>
  );
}

export default TagFilter;
