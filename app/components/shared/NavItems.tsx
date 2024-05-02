"use client";

import { headerLinks } from "@/constants";
import { link } from "fs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";
import React from "react";
import { Button } from "@/components/ui/button";

const NavItems = (props: any) => {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between items-start flex w-full flex-col gap-3 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-primary-500"
            } flex-center p-medium-16 whitespace-nowrap`}
          >
            <Button
              variant="outline"
              className="hover:bg-lime-400 hover:text-black"
            >
              <Link
                href={link.route}
                onClick={props.setOpen ? () => props.setOpen(false) : () => {}}
              >
                {link.label}
              </Link>
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
