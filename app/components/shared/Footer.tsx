import Link from "next/link";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="flex border-t p-3 justify-center items-center">
      <Link href={"/"}>
        <Logo className="w-40 text-black dark:text-white" />
      </Link>
    </footer>
  );
};

export default Footer;
