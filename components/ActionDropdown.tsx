"use client";

import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { renameFile } from "@/lib/actions/file.action";
import { usePathname } from "next/navigation";
import { FileDetails, ShareInput } from "./ActionModalContent";

interface ActionDropdownProps {
  file: Models.Document;
}

const ActionDropdown: FC<ActionDropdownProps> = ({ file }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);
  const [emails, setEmails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const path = usePathname();

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(file.name);
    setEmails([]);
  };

  const handleRemoveEmail = (email: string) => {
    setEmails((pre) => pre.filter((e) => e !== email));
  };

  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);
    let success = false;

    const actions = {
      rename: () =>
        renameFile({ fileId: file.$id, name, extension: file.extension, path }),
      share: () => console.log("share"),
      delete: () => console.log("delete"),
    };

    success = await actions[action.value as keyof typeof actions]();

    if (success) closeAllModals();

    setIsLoading(false);
  };

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action;

    return (
      <DialogContent className="rounded-xl">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {value === "share" && (
            <ShareInput
              file={file}
              onInputChange={setEmails}
              onRemove={handleRemoveEmail}
            />
          )}
          {value === "details" && <FileDetails file={file} />}

          {["rename", "delete", "share"].includes(value) && (
            <DialogFooter className="text-center text-light-100">
              <Button onClick={closeAllModals}>Cancel</Button>
              <Button onClick={handleAction}>
                <p className="capitalize">{label}</p>
                {isLoading && "Loading..."}
              </Button>
            </DialogFooter>
          )}

          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription> */}
        </DialogHeader>
      </DialogContent>
    );
  };

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
                  console.log("item.value: ", item.value);
                  setIsModalOpen(true);
                }
              }}
            >
              {item.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  {item.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">{item.label}</div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropdown;
