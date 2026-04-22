import Link from "next/link";
import { Button } from "./ui/button";
import { aboutPath, postsPath } from "@/path";

function Header() {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-4xl font-bold my-4 italic">CU-HUB</h2>
      <div>
        <Button variant={"link"} asChild>
          <Link href={postsPath}>Posts</Link>
        </Button>
        <Button variant={"link"} asChild>
          <Link href={aboutPath}>About</Link>
        </Button>
      </div>
    </div>
  );
}

export default Header;
