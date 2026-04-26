import Heading from "@/components/heading";
import CreatePostForm from "@/features/post/components/create-post-form";
import PostList from "@/features/post/components/post-list";
import { getSession } from "@/lib/get-session";
import { signInPath } from "@/path";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function PostsPage() {
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
        <PostList userId={session.user.id} />
      </Suspense>
    </div>
  );
}

export default PostsPage;
