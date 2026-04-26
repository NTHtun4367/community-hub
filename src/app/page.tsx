import Heading from "@/components/heading";
import PostList from "@/features/post/components/post-list";
import { SearchParams } from "@/features/post/types/search-params";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div>
      <Heading title="All Posts" description="View all forum posts." />
      <Suspense fallback={<p>Fetching posts...</p>}>
        <PostList userId={undefined} searchParams={params} />
      </Suspense>
    </div>
  );
}
