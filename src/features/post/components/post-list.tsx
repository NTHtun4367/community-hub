import PostItem from "@/features/post/components/post-item";
import { getPosts } from "@/features/post/queries/get-posts";

interface PostListProps {
  userId: string | undefined;
}

async function PostList({ userId = undefined }: PostListProps) {
  const posts = await getPosts(userId);

  return (
    <div className="space-y-4 my-6">
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => <PostItem {...post} key={post.id} />)
      )}
    </div>
  );
}

export default PostList;
