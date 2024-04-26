"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import NavItems from "./NavItems";
import MobileNavBar from "./MobileNavBar";
import Logo from "@/app/components/shared/Logo";

const Header = () => {
  const { theme } = useTheme();

  return (
    <header className="w-full border-b">
      <div className="wrapper flex flex-col gap-6 md:flex-row justify-between items-center">
        <Link href={"/"} className="flex gap-1 w-36 items-center">
          <Logo className="text-black dark:text-white" />
        </Link>

        <SignedIn>
          <nav className="flex-col md:flex-row md:flex hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex gap-3 items-center">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Login</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Register</Button>
            </SignUpButton>
          </SignedOut>
          <ModeToggle />
          <SignedIn>
            <UserButton
              userProfileProps={{
                appearance: {
                  baseTheme: theme === "dark" ? dark : undefined,
                },
              }}
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
              }}
              afterSignOutUrl="/"
            />
            <MobileNavBar />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
