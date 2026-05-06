import BackButton from "@/components/back-button";
import CreatePostForm from "@/features/post/components/create-post-form";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

async function CreatePost() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <BackButton />
      <CreatePostForm />
    </div>
  );
}

export default CreatePost;
