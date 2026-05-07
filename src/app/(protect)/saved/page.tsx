import { Suspense } from "react";
import SavedPostList from "@/features/post/components/saved-post-list";
import { PostListSkeleton } from "@/features/post/components/post-item-skeleton";
import BackButton from "@/components/back-button";

export default async function SavedPostsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Your Saved Bookmarks</h1>
        <BackButton />
      </div>
      <Suspense fallback={<PostListSkeleton />}>
        <SavedPostList />
      </Suspense>
    </div>
  );
}
