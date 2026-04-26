import Heading from "@/components/heading";
import CreatePostForm from "@/features/post/components/create-post-form";
import PostList from "@/features/post/components/post-list";
import { SearchParams } from "@/features/post/types/search-params";
import { getSession } from "@/lib/get-session";
import { signInPath } from "@/path";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<SearchParams>;
}

async function PostsPage({ searchParams }: Props) {
  const params = await searchParams;

  const session = await getSession();

  if (!session) {
    redirect(signInPath);
  }

  return (
    <div>
      <Heading
        title={session.user.name}
        description="View all your forum posts."
      />
      <CreatePostForm />
      <Suspense fallback={<p>Fetching posts...</p>}>
        <PostList userId={session.user.id} searchParams={params} />
      </Suspense>
    </div>
  );
}

export default PostsPage;
