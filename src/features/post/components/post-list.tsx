import SearchInput from "@/components/search-input";
import PostItem from "@/features/post/components/post-item";
import { getPosts } from "@/features/post/queries/get-posts";
import { SearchParams } from "../types/search-params";
import SortSelect from "@/components/sort-select";
import Pagination from "@/components/pagination";
import TagFilter from "./tag-filter";

interface PostListProps {
  userId: string | undefined;
  searchParams: SearchParams;
}

async function PostList({ userId = undefined, searchParams }: PostListProps) {
  const { posts, currentPage, totalPages } = await getPosts(
    userId,
    searchParams,
  );

  return (
    <div className="space-y-4 my-6">
      <SearchInput placeholder="Search post with title" />
      {searchParams.tag && <TagFilter />}
      <SortSelect
        defaultValue="desc"
        options={[
          {
            label: "Oldest",
            value: "asc",
          },
          {
            label: "Newest",
            value: "desc",
          },
        ]}
      />
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => <PostItem {...post} key={post.id} />)
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

export default PostList;
