import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { FC } from "react";

interface ThumbnailProps {
  type: string;
  extension: string;
  url: string;
  className?: string;
  imageClassName?: string;
}

const Thumbnail: FC<ThumbnailProps> = ({
  type,
  extension,
  url = "",
  className,
  imageClassName,
}) => {
  const isImage = type === "image" && extension !== "svg";

  return (
    <figure className={cn("flex justify-center items-center", className)}>
      {/* 如果是图片，显示图片，否则显示 文件对应的，图标 */}
      <Image
        src={isImage ? url : "icon"}
        alt="thumbnail"
        width={100}
        height={100}
        className={cn("size-8 object-contain", imageClassName)}
      />
    </figure>
  );
};

export default Thumbnail;
