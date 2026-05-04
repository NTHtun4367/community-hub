import ProfileOverview from "@/features/profile/components/profile-overview";
import { getSession } from "@/lib/get-session";
import { signInPath } from "@/path";
import { redirect } from "next/navigation";

async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect(signInPath);
  }

  return <ProfileOverview user={session.user} />;
}

export default ProfilePage;
