import PostItem from "@/features/post/components/post-item";
import { getPosts } from "@/features/post/queries/get-posts";
import { SearchParams } from "../types/search-params";
import SortSelect from "@/components/sort-select";
import Pagination from "@/components/pagination";
import { SearchX } from "lucide-react";

interface PostListProps {
  userId?: string;
  searchParams: SearchParams;
}

async function PostList({ userId, searchParams }: PostListProps) {
  const { posts, currentPage, totalPages } = await getPosts(
    userId,
    searchParams,
  );

  return (
    <div className="space-y-4">
      {/* Utility Bar: Sort Only */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
        <p className="text-sm font-medium text-muted-foreground">
          {searchParams.search
            ? `Results for “${searchParams.search}”`
            : searchParams.tag
              ? `Posts tagged #${searchParams.tag}`
              : `${searchParams.tab === "new" || !searchParams.tab ? "Latest" : searchParams.tab === "top" ? "Top voted" : "Trending"} discussions`}
        </p>
        <SortSelect
          defaultValue={searchParams.sort ?? "desc"}
          options={[
            { label: "Oldest", value: "asc" },
            { label: "Newest", value: "desc" },
          ]}
        />
      </div>

      <div className="grid gap-4">
        {posts.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed bg-card/50 px-6 py-12 text-center">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <SearchX className="h-5 w-5" />
            </span>
            <h3 className="font-semibold">No discussions found</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Try another search or tag, or be the first to start a conversation.
            </p>
          </div>
        ) : (
          posts.map((post) => <PostItem {...post} key={post.id} />)
        )}
      </div>

      {totalPages > 1 && (
        <div className="py-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}

export default PostList;
