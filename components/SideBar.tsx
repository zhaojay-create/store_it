"use client";

import { NavItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

interface Props {
  fullName: string;
  email: string;
  avatar: string;
}

const SideBar: FC<Props> = ({ fullName, email, avatar }) => {
  const pathName = usePathname();

  return (
    <aside className="p-4">
      <Link href="/">
        <Image
          src="/assets/logo.png"
          alt="logo"
          width={72}
          height={72}
          className="hidden h-auto lg:block"
        />
      </Link>
      <nav className="mt-3">
        <ul className="flex flex-col flex-1 gap-6">
          {NavItems.map(({ url, name, icon }) => {
            const isActive = pathName === url;
            return (
              <Link href={url} key={name} className="lg:w-full">
                <li
                  className={cn(
                    "flex items-center gap-2 text-blue-500",
                    isActive && "text-brand"
                  )}
                >
                  <Image src={icon} alt="logo" width={24} height={24} />
                  <p className="hidden lg:block">{name}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>

      {/* 用户头像 */}
      <div className="flex items-center gap-2 mt-6">
        <Image
          src={avatar}
          alt="avatar"
          width={36}
          height={36}
          className="rounded-full"
        />
        <div className="hidden lg:block">
          <p>{fullName}</p>
          <p className="truncate w-[150px]">{email}</p>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
