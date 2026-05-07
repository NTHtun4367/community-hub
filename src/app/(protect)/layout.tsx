import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function ProtectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return <section>{children}</section>;
}
