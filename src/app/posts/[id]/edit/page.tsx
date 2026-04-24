import EditPostForm from "@/features/post/components/edit-post-form";
import { getPost } from "@/features/post/queries/get-post";
import { notFound } from "next/navigation";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <EditPostForm post={post} />
    </div>
  );
}

export default EditPostPage;
