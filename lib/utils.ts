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
