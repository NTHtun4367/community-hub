import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProfileOverview } from "@/features/profile/queries/get-profile-overview";
import { postsPath } from "@/path";
import {
  Crown,
  FileText,
  MessagesSquare,
  Calendar,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import PremiumUpgradeButton from "./premium-upgrade-button";

interface ProfileOverviewProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
}

async function ProfileOverview({ user }: ProfileOverviewProps) {
  const {
    isPremium,
    postCount,
    commentCount,
    premiumAmount,
    premiumCurrency,
    premiumExpiresAt,
    premiumLastPaymentAt,
  } = await getProfileOverview();

  const formatDate = (date: Date | null) =>
    date
      ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date)
      : "N/A";

  const formattedPayment =
    premiumAmount && premiumCurrency
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: premiumCurrency.toUpperCase(),
        }).format(premiumAmount / 100)
      : "N/A";

  return (
    <main className="max-w-4xl mx-auto space-y-8 py-10">
      {/* Profile Header */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 border rounded-3xl bg-card shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback className="text-2xl">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left space-y-2">
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
              <h2 className="text-3xl font-bold tracking-tight">{user.name}</h2>
              {isPremium && (
                <Badge className="bg-linear-to-r from-amber-400 to-amber-600 text-white border-none py-1 px-3">
                  <Crown className="w-3 h-3 mr-1 fill-current" /> PRO
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link href={postsPath}>Manage Posts</Link>
        </Button>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Total Posts
            </CardTitle>
            <FileText className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold">{postCount}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Total Comments
            </CardTitle>
            <MessagesSquare className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold">{commentCount}</p>
          </CardContent>
        </Card>
      </section>

      {/* Membership Details */}
      <Card className="rounded-3xl overflow-hidden border-none shadow-md">
        <CardHeader className="bg-muted/50 border-b p-6">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="w-5 h-5" /> Membership & Billing
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            <div className="flex items-center justify-between p-5 px-8">
              <span className="text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Current Plan
              </span>
              <span className="font-bold">
                {isPremium ? "Premium Pro" : "Free Tier"}
              </span>
            </div>
            <div className="flex items-center justify-between p-5 px-8">
              <span className="text-muted-foreground">Expires On</span>
              <span className="font-medium text-destructive">
                {formatDate(premiumExpiresAt)}
              </span>
            </div>
            <div className="flex items-center justify-between p-5 px-8 bg-muted/10">
              <span className="text-muted-foreground">Last Payment</span>
              <div className="text-right text-sm">
                <p className="font-bold text-base">{formattedPayment}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(premiumLastPaymentAt)}
                </p>
              </div>
            </div>
          </div>
          {!isPremium && (
            <div className="flex justify-end p-8 bg-linear-to-b from-transparent to-muted/30">
              <PremiumUpgradeButton />
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

export default ProfileOverview;
