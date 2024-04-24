"use client";

import { headerLinks } from "@/constants";
import { link } from "fs";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavItems = () => {
  const pathname = usePathname();
  return (
    <ul className="md:flex-between flex w-full flex-col gap-3 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-primary-500"
            } flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
