import PostList from "@/features/post/components/post-list";
import { SearchParams } from "@/features/post/types/search-params";
import { Suspense } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PostListSkeleton } from "@/features/post/components/post-item-skeleton";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const currentTab = params.tab || "new";

  const tabs = [
    { id: "new", label: "New" },
    { id: "trending", label: "Trending" },
    { id: "top", label: "Top" },
  ];

  return (
    <main className="py-6">
      {/* Minimalist Tabs */}
      <div className="flex items-center border-b mb-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={{ query: { ...params, tab: tab.id, page: "1" } }}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-colors relative whitespace-nowrap",
              currentTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <Suspense key={JSON.stringify(params)} fallback={<PostListSkeleton />}>
        <PostList userId={undefined} searchParams={params} />
      </Suspense>
    </main>
  );
}
