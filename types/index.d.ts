import { Models } from "node-appwrite";

declare type FileType = "document" | "image" | "video" | "audio" | "other";

declare interface ActionType {
  icon: string;
  label: string;
  value: string;
}

declare interface SearchParamProps {
  params?: Promise<SearchParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

declare interface UploadFileProps {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
}

declare interface GetFilesProps {
  types: FileType[];
  searchText?: string;
  sort?: string;
  limit?: number;
}

declare interface RenameFileProps {
  fileId: string;
  extension: string;
  path: string;
  name: string;
}

declare interface UpdateFileUsersProps {
  fileId: string;
  emails: string[];
  path: string;
}

declare interface DeleteFileProps {
  fileId: string;
  bucketFileId: string;
  path: string;
}

declare interface FileUploaderProps {
  ownerId: string;
  accountId: string;
  className?: string;
}

declare interface MobileNavigationProps {
  ownerId: string;
  accountId: string;
  fullName: string;
  email: string;
  avatar: string;
}

declare interface ThumbnailProps {
  type: string;
  extension: string;
  url: string;
  className?: string;
  imageClassName?: string;
}

declare interface ShareInputProps {
  file: Models.Document;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (email: stirng) => void;
}
