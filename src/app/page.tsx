import Heading from "@/components/heading";
import PostList from "@/features/post/components/post-list";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Heading title="All Posts" description="View all forum posts." />
      <Suspense fallback={<p>Fetching posts...</p>}>
        <PostList userId={undefined} />
      </Suspense>
    </div>
  );
}
