import PostItem from "@/features/post/components/post-item";
import { getPosts } from "@/features/post/queries/get-posts";
import { SearchParams } from "../types/search-params";
import SortSelect from "@/components/sort-select";
import Pagination from "@/components/pagination";

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
      <div className="flex justify-between items-center pb-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
          {searchParams.tab || "New"} Posts
        </p>
        <SortSelect
          defaultValue="desc"
          options={[
            { label: "Oldest", value: "asc" },
            { label: "Newest", value: "desc" },
          ]}
        />
      </div>

      <div className="grid gap-4">
        {posts.length === 0 ? (
          <div className="text-center py-20 border rounded-xl bg-muted/10">
            <p className="text-muted-foreground">No posts found.</p>
          </div>
        ) : (
          posts.map((post: any) => <PostItem {...post} key={post.id} />)
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
