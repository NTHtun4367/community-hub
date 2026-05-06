import { signOut } from "@/features/auth/actions/signout";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

function SignOutButton() {
  return (
    <form action={signOut}>
      <Button
        size="sm"
        variant="destructive"
        type="submit"
        className="w-full text-xs"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </form>
  );
}

export default SignOutButton;
