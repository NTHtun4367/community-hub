import PostItem from "@/features/post/components/post-item";
import { getSavedPosts } from "@/features/post/queries/get-saved-post";

export default async function SavedPostsPage() {
  const savedPosts = await getSavedPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Saved Bookmarks</h1>
      {savedPosts.length === 0 ? (
        <p className="text-muted-foreground text-center py-20">
          No saved posts yet.
        </p>
      ) : (
        savedPosts.map((post) => <PostItem key={post.id} {...post} />)
      )}
    </div>
  );
}
