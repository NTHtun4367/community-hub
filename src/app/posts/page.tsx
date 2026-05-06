import Heading from "@/components/heading";
import { PostListSkeleton } from "@/features/post/components/post-item-skeleton";
import PostList from "@/features/post/components/post-list";
import { SearchParams } from "@/features/post/types/search-params";
import { getSession } from "@/lib/get-session";
import { Suspense } from "react";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<SearchParams>;
}

async function PostsPage({ searchParams }: Props) {
  const params = await searchParams;

  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <Heading
        title={session.user.name}
        description="View all your forum posts."
      />
      <Suspense key={JSON.stringify(params)} fallback={<PostListSkeleton />}>
        <PostList userId={session.user.id} searchParams={params} />
      </Suspense>
    </div>
  );
}

export default PostsPage;
