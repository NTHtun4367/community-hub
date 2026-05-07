import { getNotifications } from "@/features/notification/queries/get-notifications";
import NotificationList from "@/features/notification/components/notification-list";

export default async function NotificationsPage() {
  const notifications = await getNotifications();

  return (
    <main className="py-8">
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
