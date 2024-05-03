import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 text-center sm:flex-row">
        <Link href={"/"}>
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
        </Link>
        <p>2024 Eventful - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
