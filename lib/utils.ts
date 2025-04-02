import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseStringify(value: unknown) {
  return JSON.parse(JSON.stringify(value));
}

export function getFileType(fileName: string) {
  const extension = fileName.split(".").pop();
  let type = "";

  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "webp":
    case "svg":
    case "gif":
    case "ico":
      type = "image";
      break;
    case "mp4":
    case "mav":
      type = "video";
      break;
    case "pdf":
    case "docx":
    case "doc":
      type = "document";
      break;
    default:
      type = "unknown";
      break;
  }

  return { type, extension };
}

export const getFileTypesParams = (type: string) => {
  switch (type) {
    case "documents":
      return ["ddcument"];
    case "images":
      return ["image"];
    case "media":
      return ["video", "audio"];
    case "others":
      return ["other"];
    default:
      return ["document"];
  }
};

// 转换文件为 URL
export const convertFileToUrl = (file: File) => {
  return URL.createObjectURL(file);
};

// 转换文件的，的大小
export const convertFileSize = (size: number) => {
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const exponent = Math.min(Math.floor(Math.log2(size) / 10), units.length - 1);
  const unit = units[exponent];
  return `${(size / Math.pow(2, 10 * exponent)).toFixed(2)} ${unit}`;
};

// 格式化日期
// 2025-03-31T15:19:09.698+00:00
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

//
export const constructDownloadUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};
