import Link from "next/link";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <header className="h-14 px-10 flex items-center justify-between border-b border-border-primary">
      <Link href="/" className="flex items-center gap-2">
        <span className="font-mono text-xl font-bold text-accent-green">
          &gt;
        </span>
        <span className="font-mono text-lg font-medium text-foreground">
          devroast
        </span>
      </Link>
      <nav>
        <Link href="/leaderboard">
          <Button variant="link">leaderboard</Button>
        </Link>
      </nav>
    </header>
  );
}

export { Navbar };
