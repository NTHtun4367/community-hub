import ProfileOverview from "@/features/profile/components/profile-overview";
import { getSession } from "@/lib/get-session";

async function ProfilePage() {
  const session = await getSession();

  return <ProfileOverview user={session?.user!} />;
}

export default ProfilePage;
