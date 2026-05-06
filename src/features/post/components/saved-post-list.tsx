import PostItem from "@/features/post/components/post-item";
import { getSavedPosts } from "@/features/post/queries/get-saved-post";

async function SavedPostList() {
  const savedPosts = await getSavedPosts();

  if (savedPosts.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-20">
        No saved posts yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {savedPosts.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  );
}

export default SavedPostList;
