import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full">
      <nav className="wrapper flex justify-between items-center">
        <Link href={"/"} className="flex gap-1 w-36 items-center">
          <Image
            src={"/assets/images/logo.svg"}
            alt="Eventful Logo"
            width={32}
            height={32}
          />
          <h1>
            Eventful<span className="text-primary">App</span>
          </h1>
        </Link>

        <div className="flex gap-2">
          <Button>Login</Button>
          <Button>Register</Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
