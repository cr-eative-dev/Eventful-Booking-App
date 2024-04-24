import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "./components/mode-toggle";

export default function Home() {
  return (
    <main>
      <ModeToggle />
      <h1>
        Eventful<span className="text-primary">App</span>
      </h1>
      <Button>Test</Button>
    </main>
  );
}
