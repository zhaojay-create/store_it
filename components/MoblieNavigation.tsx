"use Client";

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

interface Props {
  fullName: string;
  email: string;
  avatar: string;
}

const MoblieNavigation: FC = ({}) => {
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
              <div className="">user-avatar</div>
            </SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MoblieNavigation;
