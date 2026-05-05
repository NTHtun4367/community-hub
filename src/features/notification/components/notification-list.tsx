"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MessageSquare, ThumbsUp, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markAsRead } from "../actions/push-notification";
import {
  deleteAllNotifications,
  deleteNotification,
} from "../actions/delete-notification";
import { Notification } from "@/generated/prisma/client";

interface Props {
  initialNotifications: Notification[];
}

export default function NotificationList({ initialNotifications }: Props) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleRead = async (id: string) => {
    await markAsRead({ id });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteNotification({ id });
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleDeleteAll = async () => {
    if (confirm("Are you sure you want to clear all notifications?")) {
      await deleteAllNotifications();
      setNotifications([]);
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="text-center py-20 border rounded-2xl bg-muted/20">
        <p className="text-muted-foreground">Your inbox is empty.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDeleteAll}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 text-xs gap-2"
        >
          <Trash2 size={14} /> Clear All
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="relative group">
            <Link
              href={`/posts/${n.postId}`}
              onClick={() => handleRead(n.id)}
              className={cn(
                "flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-sm",
                n.isRead
                  ? "bg-background opacity-80"
                  : "bg-blue-50/30 dark:bg-blue-900/10 border-primary/10 dark:border-primary/90",
              )}
            >
              <div
                className={cn(
                  "mt-1 p-2 rounded-full shrink-0",
                  n.type === "VOTE"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-primary/10 text-primary",
                )}
              >
                {n.type === "VOTE" ? (
                  <ThumbsUp size={16} />
                ) : (
                  <MessageSquare size={16} />
                )}
              </div>

              <div className="flex-1 pr-8">
                <p className={cn("text-sm", !n.isRead && "font-semibold")}>
                  {n.message}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>

              {!n.isRead && (
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              )}
            </Link>

            <button
              onClick={(e) => handleDelete(e, n.id)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-white"
              title="Delete"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
