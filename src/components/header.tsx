import Link from "next/link";
import { Button } from "./ui/button";
import { postsPath, signInPath, signUpPath } from "@/path";
import { ModeToggle } from "./theme-toggler";
import { signOut } from "@/features/auth/actions/signout";
import { getSession } from "@/lib/get-session";

async function Header() {
  const session = await getSession();

  return (
    <div className="flex items-center justify-between mt-4 mb-8">
      <Link href={"/"} className="text-4xl font-bold italic">
        CU-HUB
      </Link>
      <div className="flex items-center gap-2">
        {session ? <SignOutButton /> : <SignInAndSignUpButtons />}
        <ModeToggle />
      </div>
    </div>
  );
}

export default Header;

function SignInAndSignUpButtons() {
  return (
    <div className="flex gap-2">
      <Button asChild>
        <Link href={signUpPath}>Sign Up</Link>
      </Button>
      <Button variant={"outline"} asChild>
        <Link href={signInPath}>Sign In</Link>
      </Button>
    </div>
  );
}

function SignOutButton() {
  return (
    <>
      <Button variant={"link"} asChild>
        <Link href={postsPath}>My Posts</Link>
      </Button>
      <form action={signOut}>
        <Button variant={"destructive"} type="submit">
          Sign Out
        </Button>
      </form>
    </>
  );
}
