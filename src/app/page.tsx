import PostList from "@/features/post/components/post-list";
import { SearchParams } from "@/features/post/types/search-params";
import { Suspense } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PostListSkeleton } from "@/features/post/components/post-item-skeleton";
import { Flame, Sparkles, Trophy } from "lucide-react";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const currentTab = params.tab || "new";

  const tabs = [
    { id: "new", label: "Latest", icon: Sparkles },
    { id: "trending", label: "Trending", icon: Flame },
    { id: "top", label: "Top voted", icon: Trophy },
  ];

  return (
    <main className="mx-auto max-w-5xl py-5 sm:py-8">
      <section className="relative mb-7 overflow-hidden rounded-3xl border bg-card px-6 py-7 shadow-sm sm:px-9 sm:py-9">
        <div className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Developer community</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Build better, together.</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Share what you’re working on, ask for help, and learn from developers who have been there.
          </p>
        </div>
      </section>

      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Community feed</h2>
          <p className="mt-1 text-sm text-muted-foreground">Explore ideas and conversations from the community.</p>
        </div>
      </div>

      <div className="mb-5 flex items-center gap-1 overflow-x-auto rounded-2xl border bg-card/70 p-1.5 shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
          <Link
            key={tab.id}
            href={{ query: { ...params, tab: tab.id, page: "1" } }}
            className={cn(
              "inline-flex min-h-10 items-center gap-2 rounded-xl px-4 text-sm font-medium transition-all whitespace-nowrap",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </Link>
          );
        })}
      </div>

      <Suspense key={JSON.stringify(params)} fallback={<PostListSkeleton />}>
        <PostList userId={undefined} searchParams={params} />
      </Suspense>
    </main>
  );
}
