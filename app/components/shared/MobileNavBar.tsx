import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import NavItems from "./NavItems";

const MobileNavBar = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src={"/assets/icons/mobile-menu.svg"}
            alt="Mobile Menu Icon"
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/logo.svg"
              alt="Eventful Logo"
              width={32}
              height={32}
            />
            <h1>
              Eventful<span className="text-primary">App</span>
            </h1>
          </div>
          <Separator />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNavBar;
