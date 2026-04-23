import PostItem from "@/features/post/components/post-item";
import { getPost } from "@/features/post/queries/get-post";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

async function SinglePostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return <PostItem {...post} isCard={false} />;
}

export default SinglePostPage;
