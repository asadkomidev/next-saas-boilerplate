"use client";

import UserMenu from "./user-menu";
import Navigation from "./navigation";
import MobileMenu from "./mobile-menu";

import { ThemeToggle } from "./theme-toggle";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { getUser } from "@/modules/auth/lib/get-user";
import { SignInButton } from "../buttons/signin-button";
import { useUser } from "@/hooks/use-user";

const Navbar = () => {
  const user = useUser();
  return (
    <nav className=" ">
      <div className="flex justify-between items-center py-2">
        <div className="flex items-center gap-6">
          <div className="dark:text-red-500">
            <Logo />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex">
            <Navigation />
          </div>
          <div className="pt-2">
            <ThemeToggle />
          </div>
          <div className="flex">
            {user ? (
              <UserMenu />
            ) : (
              <>
                <div className="hidden md:flex">
                  <SignInButton mode="modal" asChild>
                    <Button size="sm">Sign in</Button>
                  </SignInButton>
                </div>
                <div className="flex md:hidden">
                  <MobileMenu />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
