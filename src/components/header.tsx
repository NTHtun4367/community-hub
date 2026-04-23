import Link from "next/link";
import { Button } from "./ui/button";
import { aboutPath, postsPath } from "@/path";
import { ModeToggle } from "./theme-toggler";

function Header() {
  return (
    <div className="flex items-center justify-between mt-4 mb-8">
      <Link href={"/"} className="text-4xl font-bold italic">
        CU-HUB
      </Link>
      <div>
        <Button variant={"link"} asChild>
          <Link href={postsPath}>Posts</Link>
        </Button>
        <Button variant={"link"} asChild>
          <Link href={aboutPath}>About</Link>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}

export default Header;
