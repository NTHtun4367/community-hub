"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function OAuthButtons() {
  const gitHubOAuthHandler = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };

  const googleOAuthHandler = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Button className="w-full" variant="outline" onClick={googleOAuthHandler}>
        <FaGoogle className="h-4 w-4" />
        Continue with Google
      </Button>
      <Button className="w-full" variant="outline" onClick={gitHubOAuthHandler}>
        <FaGithub className="h-4 w-4" />
        Continue with GitHub
      </Button>
    </div>
  );
}
