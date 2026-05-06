import BackButton from "@/components/back-button";
import EditPostForm from "@/features/post/components/edit-post-form";
import { getPost } from "@/features/post/queries/get-post";
import { getSession } from "@/lib/get-session";
import { isOwner } from "@/lib/is-owner";
import { notFound, redirect } from "next/navigation";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;

  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const post = await getPost(id);
  const owner = await isOwner(post?.userId!);

  if (!post || !owner) {
    notFound();
  }

  return (
    <div>
      <BackButton />
      <EditPostForm post={post} />
    </div>
  );
}

export default EditPostPage;
