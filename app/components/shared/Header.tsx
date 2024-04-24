"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import Image from "next/image";
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
    <header className="w-full">
      <div className="wrapper flex justify-between items-center">
        <Link href={"/"} className="flex gap-1 w-36 items-center">
          <Logo className="w-40 text-black dark:text-white" />
          {/* <Image
            src={"/assets/images/logo.svg"}
            alt="Eventful Logo"
            width={400}
            height={350}
          /> */}
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex gap-2 items-center">
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

          <SignedOut>
            <SignInButton mode="modal">
              <Button>Login</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Register</Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
