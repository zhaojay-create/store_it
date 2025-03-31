"use client";

import React, { FC, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { NavItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FileUploader from "./FileUploader";
import { Button } from "./ui/button";
import { signOutUser } from "@/lib/actions/user.actions";

interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  email: string;
  avatar: string;
}

const MoblieNavigation: FC<Props> = ({
  $id: ownerId,
  accountId,
  fullName,
  email,
  avatar,
}) => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  return (
    <header className="flex justify-between items-center px-4">
      <div>TitleImg</div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent className="h-screen px-3">
          <SheetHeader>
            <SheetTitle>
              <Image src={avatar} alt="avatar" height={32} width={32} />
              <div>{fullName}</div>
              <div>{email}</div>
              <Separator className="mb-4 bg-light-200" />
            </SheetTitle>

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
                        <p>{name}</p>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </nav>
            <Separator className="my-5 bg-light-200/20" />
            <div className="flex flex-col justify-between gap-5">
              <FileUploader ownerId={ownerId} accountId={accountId} />
              <Button onClick={async () => await signOutUser()}>logout</Button>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MoblieNavigation;
