"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { accountNavigationLinks } from "../data/account-navigation-links";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 px-4">
      {accountNavigationLinks.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}>
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
