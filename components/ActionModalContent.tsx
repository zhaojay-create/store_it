import React, { FC } from "react";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import FromattedDateTime from "./FromattedDateTime";
import { convertFileSize, formatDate } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ImageThumbnail = ({ file }: { file: Models.Document }) => {
  return (
    <div className="flex gap-3 border-2 border-solid bg-zinc-200 border-zinc-600 px-2 rounded-xl py-2">
      <Thumbnail type={file.type} extension={file.extension} url={file.url} />
      <div className="flex-col gap-3">
        <p className="capitalize">{file.name}</p>
        <FromattedDateTime
          date={file.$createdAt}
          className="text-sm text-light-100"
        />
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex ">
      <p className="text-left text-zinc-500 w-1/3">{label}</p>
      <p className="text-left text-light-100 font-semibold">{value}</p>
    </div>
  );
};

export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-4 px-2 pt-2">
        <DetailRow label="Format:" value={file.extension} />
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        <DetailRow label="Owner:" value={file.ownerId.fullName} />
        <DetailRow label="Last Modified:" value={formatDate(file.$updatedAt)} />
      </div>
    </>
  );
};

interface ShareInputProps {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareInput: FC<ShareInputProps> = ({
  file,
  onInputChange,
  onRemove,
}) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="grid grid-rows-4 gap-2">
        <p>share file with other users</p>
        <Input
          type="email"
          placeholder="enter emails separated by commas"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
        />
        <div className="flex justify-between items-center">
          <p className="font-semibold text-light-100">shared with</p>
          <p className="text-gray-400">{file.users.length}users</p>
        </div>
        <ul className="pt-2">
          {file.users.map((email: string) => (
            <li key={email}>
              <div className="flex justify-between items-center gap-2">
                <p>{email}</p>
                <Button
                  className="text-red-500"
                  onClick={() => onRemove(email)}
                >
                  remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
