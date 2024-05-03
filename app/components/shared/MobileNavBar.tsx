"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator";
import NavItems from "./NavItems";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { useState } from "react";

const MobileNavBar = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <nav className="md:hidden">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger className="align-middle">
          <MobileMenu className="w-8 text-black dark:text-white" />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden dark:bg-black">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/logo-white.png"
              width={164}
              height={38}
              alt="Eventful logo"
              className="hidden dark:block"
            />
            <Image
              src="/assets/images/logo-black.png"
              width={164}
              height={38}
              alt="Eventful logo black"
              className="flex-center dark:hidden"
            />
          </div>
          <Separator />
          <NavItems setOpen={setSheetOpen} />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNavBar;
