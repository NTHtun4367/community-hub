import PostItem from "@/features/post/components/post-item";
import { getPosts } from "@/features/post/queries/get-posts";

async function PostList() {
  const posts = await getPosts();

  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => <PostItem {...post} key={post.id} />)
      )}
    </div>
  );
}

export default PostList;
