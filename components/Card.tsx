import Link from "next/link";
import { Models } from "node-appwrite";
import React, { FC } from "react";
import Thumbnail from "./Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FromattedDateTime from "./FromattedDateTime";
import ActionDropdown from "./ActionDropdown";

interface CardProps {
  file: Models.Document;
}

const Card: FC<CardProps> = ({ file }) => {
  return (
    <Link
      href={file.url}
      target="_blank"
      className="block w-1/3 rounded-xl p-2 bg-white text-zinc-950"
    >
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />
        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} />
          <p className="">{convertFileSize(file.size)}</p>
        </div>
      </div>

      {/* details */}
      <div>
        <p className="truncate line-clamp-1"> {file.name}</p>
        <FromattedDateTime date={file.$createdAt} className="text-light-200" />
        <p>By: {file.ownerId.fullName}</p>
      </div>
    </Link>
  );
};

export default Card;
