import { getSession } from "@/lib/get-session";
import { postsPath } from "@/path";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (session) {
    redirect(postsPath);
  }

  return <>{children}</>;
}
