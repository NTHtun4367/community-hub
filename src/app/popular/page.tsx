import Pagination from "@/components/pagination";
import PostItem from "@/features/post/components/post-item";
import { PostListSkeleton } from "@/features/post/components/post-item-skeleton";
import { getPosts } from "@/features/post/queries/get-posts";
import { SearchParams } from "@/features/post/types/search-params";
import { ArrowUp, Flame, Trophy } from "lucide-react";
import { Suspense } from "react";

interface PopularPageProps {
  searchParams: Promise<Partial<SearchParams>>;
}

async function PopularPosts({ searchParams }: { searchParams: SearchParams }) {
  const { posts, currentPage, totalPages } = await getPosts(undefined, {
    ...searchParams,
    tab: "top",
  });

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3 border-b pb-3">
        <p className="text-sm font-medium text-muted-foreground">
          Ranked by community votes
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <ArrowUp className="h-3.5 w-3.5" /> Top voted
        </span>
      </div>

      {posts.length ? (
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostItem {...post} key={post.id} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed bg-card/50 px-6 py-12 text-center">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <Trophy className="h-5 w-5" />
          </span>
          <h2 className="font-semibold">No popular posts yet</h2>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Once the community starts voting, the most useful discussions will appear here.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </>
  );
}

export default async function PopularPage({ searchParams }: PopularPageProps) {
  const params = await searchParams;
  const normalizedParams: SearchParams = {
    search: params.search,
    sort: params.sort,
    page: params.page,
    tag: params.tag,
    tab: "top",
  };

  return (
    <main className="mx-auto max-w-5xl py-5 sm:py-8">
      <section className="relative mb-7 overflow-hidden rounded-3xl border bg-card px-6 py-7 shadow-sm sm:px-9 sm:py-9">
        <div className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Flame className="h-4 w-4" /> Community favorites
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Popular discussions
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            The posts earning the most votes from the developer community.
          </p>
        </div>
      </section>

      <Suspense fallback={<PostListSkeleton />}>
        <PopularPosts searchParams={normalizedParams} />
      </Suspense>
    </main>
  );
}
