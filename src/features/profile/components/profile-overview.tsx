import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProviewOverview } from "@/features/profile/queries/get-profile-overview";
import { postsPath } from "@/path";
import { Crown, FileText, MessagesSquare } from "lucide-react";
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
  } = await getProviewOverview(user.id);

  const formattedExpiry = premiumExpiresAt
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        premiumExpiresAt,
      )
    : "N/A";

  const formattedLastPayment = premiumLastPaymentAt
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        premiumLastPaymentAt,
      )
    : "N/A";

  const formattedPayment =
    premiumAmount && premiumCurrency
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: premiumCurrency.toUpperCase(),
        }).format(premiumAmount / 100)
      : "N/A";

  const planLabel = isPremium ? "Premium Member" : "Free Member";

  return (
    <main className="space-y-6">
      <section className="flex items-center justify-between border rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 border">
            <AvatarImage src={user.image ?? undefined} alt={user.name} />
            <AvatarFallback className="text-xl font-semibold">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">{user.name}</h2>
              {isPremium && (
                <Badge className="border bg-amber-500 text-primary cursor-pointer">
                  <Crown /> Premium
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Button asChild size={"sm"} variant={"outline"}>
          <Link href={postsPath}>View my posts</Link>
        </Button>
      </section>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Posts</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{postCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Comments</CardTitle>
            <MessagesSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{commentCount}</p>
          </CardContent>
        </Card>
      </section>
      <section>
        <Card>
          <CardHeader>Membership</CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-md border p-3">
              <span className="text-sm text-muted-foreground">Plan</span>
              <span className="text-sm font-medium">{planLabel}</span>
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <span className="text-sm text-muted-foreground">Expired</span>
              <span className="text-sm font-medium">{formattedExpiry}</span>
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <span className="text-sm text-muted-foreground">
                Last payment
              </span>
              <span className="text-sm font-medium">
                {formattedLastPayment}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-sm font-medium">{formattedPayment}</span>
            </div>
            {!isPremium ? <PremiumUpgradeButton /> : null}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default ProfileOverview;
