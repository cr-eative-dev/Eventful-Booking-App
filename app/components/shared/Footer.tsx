import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="max-w-7xl lg:mx-auto p-5 md:p-5 xl:p-5 w-full justify-center items-center sm:justify-between sm:items-end flex flex-col gap-4 text-center sm:flex-row">
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
            className="dark:hidden"
          />
        </Link>
        <p>2024 Eventful - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
