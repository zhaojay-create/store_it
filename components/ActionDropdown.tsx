"use client";

import React, { FC, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Models } from "node-appwrite";
import { actionsDropdownItems } from "@/constants";
import { ActionType } from "@/types";
import { constructDownloadUrl } from "@/lib/utils";
import Link from "next/link";

interface ActionDropdownProps {
  file: Models.Document;
}

const ActionDropdown: FC<ActionDropdownProps> = ({ file }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((item) => (
            <DropdownMenuItem
              key={item.value}
              onClick={() => {
                setAction(item);

                if (
                  ["details", "rename", "share", "delete"].includes(item.value)
                ) {
                  setIsModalOpen(true);
                }
              }}
            >
              <Link
                href={constructDownloadUrl(file.bucketFileId)}
                download={file.name}
                className="flex items-center gap-2"
              >
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
};

export default ActionDropdown;
