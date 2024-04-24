import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <nav className="flex justify-between items-center p-2">
      <h1>
        Eventful<span className="text-primary">App</span>
      </h1>
      <div className="flex gap-2">
        <Button>Login</Button>
        <Button>Register</Button>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Header;
