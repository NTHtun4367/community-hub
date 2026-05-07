"use client";

import {
  Home,
  TrendingUp,
  User,
  FileText,
  Bookmark,
  Crown,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { profilePath, postsPath, savedPostPath } from "@/path";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

// Main Navigation
const navItems = [
  { title: "Home", icon: Home, url: "/" },
  { title: "Popular", icon: TrendingUp, url: "/popular" },
];

// User/Account Navigation
const userItems = [
  { title: "Profile", icon: User, url: profilePath },
  { title: "My Posts", icon: FileText, url: postsPath },
  { title: "Saved Posts", icon: Bookmark, url: savedPostPath },
];

interface Props {
  session: any;
}

export function AppSidebar({ session }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      {/* Logo Section */}
      <SidebarHeader className="h-fit flex items-center justify-start px-4 py-0.5 group-data-[collapsible=icon]:py-2 border-b border-border/50">
        <Link
          href="/"
          className="flex items-center justify-start gap-1 font-black text-3xl tracking-tighter"
        >
          <div className="relative h-13 w-13 shrink-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 transition-all duration-300">
            <Image
              src="/coda-logo.png"
              alt="Coda Logo"
              fill
              sizes="(max-width: 768px) 32px, 40px"
              className="object-contain"
              priority
            />
          </div>
          <span className="group-data-[collapsible=icon]:hidden bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            CODA
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Group 1: General Menu */}
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={isActive}
                    className={cn(
                      "transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary hover:bg-primary/15"
                        : "",
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon
                        className={cn("h-4 w-4", isActive && "text-primary")}
                      />
                      <span className={cn(isActive && "font-semibold")}>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Group 2: User Menu (Show only if session exists) */}
        {session && (
          <SidebarGroup>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
              Account
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {userItems.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={isActive}
                        className={cn(
                          "transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary hover:bg-primary/15"
                            : "",
                        )}
                      >
                        <Link href={item.url}>
                          <item.icon
                            className={cn(
                              "h-4 w-4",
                              isActive && "text-primary",
                            )}
                          />
                          <span className={cn(isActive && "font-semibold")}>
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* Sidebar Footer: Premium Badge Box */}
      {session && !session.user.isPremium && (
        <SidebarFooter className="p-4">
          <div className="group-data-[collapsible=icon]:hidden">
            <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-primary/10 via-purple-500/5 to-background border border-primary/20 p-4">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-primary/20 p-1.5 rounded-lg">
                    <Crown className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-bold italic tracking-tight">
                    Coda Premium
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  Unlock exclusive features and support the community.
                </p>
                <Button
                  size="sm"
                  className="w-full h-8 text-xs font-semibold gap-2 shadow-sm shadow-primary/20"
                  onClick={() => router.push(profilePath)}
                >
                  <Sparkles className="h-3 w-3" />
                  Upgrade Now
                </Button>
              </div>
              <div className="absolute -right-2 -bottom-2 h-16 w-16 bg-primary/10 blur-2xl rounded-full" />
            </div>
          </div>

          <div className="hidden group-data-[collapsible=icon]:flex justify-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 text-primary hover:bg-primary/10"
              onClick={() => router.push(profilePath)}
            >
              <Crown className="h-5 w-5" />
            </Button>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
