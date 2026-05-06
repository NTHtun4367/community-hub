"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";

interface AuthDialogProps {
  triggerLabel?: string;
  variant?: "default" | "outline" | "ghost";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  showTrigger?: boolean;
}

export function AuthDialog({
  triggerLabel = "Sign In",
  variant = "default",
  open,
  onOpenChange,
  children,
  showTrigger = true,
}: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button size={"sm"} variant={variant}>
            {triggerLabel}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-112.5 p-0 border-none bg-transparent">
        <DialogTitle className="sr-only">Authentication</DialogTitle>
        <div className="w-full">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
