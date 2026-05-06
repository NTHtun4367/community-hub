"use client";

import { useState } from "react";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./theme-toggler";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { createPostPath } from "@/path";
import GlobalSearch from "./global-search";
import { NotificationsNav } from "../features/notification/components/notifications-nav";
import SignOutButton from "./sign-out-button";
import { AuthDialog } from "./auth-dialog";
import SignInForm from "@/features/auth/components/signin-form";
import SignUpForm from "@/features/auth/components/signup-form";
import { Notification } from "@/generated/prisma/client";

interface Props {
  session: any;
  notifications?: Notification[];
}

function Header({ session, notifications = [] }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [authView, setAuthView] = useState<"signin" | "signup">("signin");

  const handleOpenSignIn = () => {
    setAuthView("signin");
    setIsOpen(true);
  };

  const handleOpenSignUp = () => {
    setAuthView("signup");
    setIsOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur shrink-0">
      <div className="flex h-14 items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="hover:bg-muted" />
        </div>

        <div className="flex-1 max-w-xl mx-auto">
          <GlobalSearch />
        </div>

        <div className="flex items-center gap-2">
          {session ? (
            <div className="flex items-center gap-3">
              <NotificationsNav notifications={notifications} />
              <Button size="sm" variant="default" asChild>
                <Link href={createPostPath}>
                  <Plus className="h-4 w-4" />
                  <span className="hidden md:inline">Create</span>
                </Link>
              </Button>
              <SignOutButton />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleOpenSignIn}>
                Sign In
              </Button>
              <Button size="sm" onClick={handleOpenSignUp}>
                Sign Up
              </Button>
            </div>
          )}
          <ModeToggle />
        </div>
      </div>

      <AuthDialog open={isOpen} onOpenChange={setIsOpen} showTrigger={false}>
        {authView === "signin" ? (
          <SignInForm
            onSwitchView={() => setAuthView("signup")}
            setIsOpen={setIsOpen}
          />
        ) : (
          <SignUpForm onSwitchView={() => setAuthView("signin")} />
        )}
      </AuthDialog>
    </header>
  );
}

export default Header;
