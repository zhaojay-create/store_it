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
    case "mp3":
    case "wav":
    case "ogg":
      type = "audio";
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
      return ["document"];
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
  if (size === 0) return "0 B";
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

// 构造下载 URL
export const constructDownloadUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};

// 根据 type 获取文件的图标
export const getFileIcon = (type: string) => {
  switch (type) {
    case "image":
      return "/assets/image_icon.png";
    case "video":
      return "/assets/media_icon.png";
    case "audio":
      return "/assets/audio_icon.png";
    case "document":
      return "/assets/document_icon.png";
    default:
      return "/assets/other_icon.png";
  }
};

// 获取用量概览
export function getUsageSummary(total: any) {
  const { image, video, audio, document, other } = total;

  const mediaSize = video.size + audio.size;
  const mediaLatestDate = new Date(
    Math.max(
      new Date(video.latestDate).getTime(),
      new Date(audio.latestDate).getTime()
    )
  ).toISOString();

  return [
    {
      type: "document",
      size: document.size,
      latestDate: document.latestDate,
    },
    {
      type: "other",
      size: other.size,
      latestDate: other.latestDate || null,
    },
    {
      type: "image",
      size: image.size,
      latestDate: image.latestDate,
    },
    {
      type: "media",
      size: mediaSize,
      latestDate: mediaLatestDate,
    },
  ];
}
