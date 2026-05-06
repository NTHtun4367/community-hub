import BackButton from "@/components/back-button";
import Comments from "@/features/comment/components/comments";
import PostItem from "@/features/post/components/post-item";
import { PostItemSkeleton } from "@/features/post/components/post-item-skeleton";
import { getPost } from "@/features/post/queries/get-post";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

async function SinglePostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Back Button Component */}
      <BackButton />

      <Suspense fallback={<PostItemSkeleton />}>
        <PostItem {...post} isCard={false} />
      </Suspense>

      <div className="mt-8">
        <Comments postId={id} />
      </div>
    </div>
  );
}

export default SinglePostPage;
