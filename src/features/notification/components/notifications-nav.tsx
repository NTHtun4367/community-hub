"use client";

import { Bell, CheckCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { markAllAsRead, markAsRead } from "../actions/push-notification";
import { Notification } from "@/generated/prisma/client";
import { notificationPath } from "@/path";

interface Props {
  notifications: Notification[];
}

export function NotificationsNav({ notifications }: Props) {
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const displayNotifications = notifications.slice(0, 3);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-[10px] text-white flex items-center justify-center rounded-full border-2 border-background">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 max-h-125 overflow-hidden p-0 flex flex-col"
      >
        <div className="p-3 font-bold border-b text-sm flex justify-between items-center bg-background">
          Notifications
          {unreadCount > 0 && (
            <button
              onClick={() => markAllAsRead()}
              className="text-[11px] font-normal text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck size={12} /> Mark all read
            </button>
          )}
        </div>

        <div className="overflow-y-auto flex-1 max-h-87.5">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No updates yet
            </div>
          ) : (
            displayNotifications.map((n) => (
              <DropdownMenuItem
                key={n.id}
                asChild
                className="p-0 focus:bg-transparent"
              >
                <Link
                  href={`/posts/${n.postId}`}
                  onClick={() => markAsRead({ id: n.id })}
                  className={cn(
                    "flex flex-col items-start p-4 gap-1 border-b last:border-0 hover:bg-muted/50 transition-colors",
                    !n.isRead && "bg-blue-50/40 dark:bg-blue-900/10",
                  )}
                >
                  <p
                    className={cn(
                      "text-sm leading-snug",
                      !n.isRead && "font-semibold",
                    )}
                  >
                    {n.message}
                  </p>
                  <span className="text-[10px] text-muted-foreground italic">
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </Link>
              </DropdownMenuItem>
            ))
          )}
        </div>

        <Link
          href={notificationPath}
          className="p-3 text-center text-xs font-medium border-t hover:bg-muted transition-colors flex items-center justify-center gap-2 text-muted-foreground"
        >
          View All Notifications <ExternalLink size={12} />
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
