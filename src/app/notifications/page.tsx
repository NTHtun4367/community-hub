import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { signInPath } from "@/path";
import { getNotifications } from "@/features/notification/queries/get-notifications";
import NotificationList from "@/features/notification/components/notification-list";

// export const metadata = {
//   title: "Notifications | Forum",
// };

export default async function NotificationsPage() {
  const session = await getSession();
  if (!session) redirect(signInPath);

  const notifications = await getNotifications();

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <span className="text-sm text-muted-foreground">
          Showing recent updates
        </span>
      </div>

      <NotificationList initialNotifications={notifications} />
    </main>
  );
}
