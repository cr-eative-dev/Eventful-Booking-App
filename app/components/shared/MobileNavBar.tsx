import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator";
import NavItems from "./NavItems";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

const MobileNavBar = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <MobileMenu className="w-8 text-black dark:text-white" />
          {/* <Image
            src={"/assets/icons/mobile-menu.svg"}
            alt="Mobile Menu Icon"
            width={32}
            height={32}
            className="cursor-pointer"
          /> */}
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden dark:bg-black">
          <div className="flex items-center gap-2">
            <Logo className="w-40 text-black dark:text-white" />
            {/* <Image
              src="/assets/images/logo.svg"
              alt="Eventful Logo"
              width={120}
              height={120}
            /> */}
          </div>
          <Separator />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNavBar;
