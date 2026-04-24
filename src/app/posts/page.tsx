import Heading from "@/components/heading";
import CreatePostForm from "@/features/post/components/create-post-form";
import PostList from "@/features/post/components/post-list";
import { Suspense } from "react";

function PostsPage() {
  return (
    <div>
      <Heading title="All Posts" description="View all forum posts." />
      <CreatePostForm />
      <Suspense fallback={<p>Fetching posts...</p>}>
        <PostList />
      </Suspense>
    </div>
  );
}

export default PostsPage;
