"use server";

import {
  RenameFileProps,
  UpdateFileUsersProps,
  UploadFileProps,
} from "@/types";
import { createAdminClient } from "../appwrite";
import { handleError } from "./base";
import { InputFile } from "node-appwrite/file";
import { appwriteConfig } from "../appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { convertFileToUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";

export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path,
}: UploadFileProps) => {
  const { storage, databases } = await createAdminClient();

  try {
    // 接受文件，进行流式上传
    const inputFile = InputFile.fromBuffer(file, file.name);
    // 创建文件 bucket 的意思是，我要把文件存储的地方
    const bucketFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      inputFile
    );

    const fileUrl = await storage.getFileView(
      appwriteConfig.bucketId,
      bucketFile.$id
    );
    const fileDocument = {
      type: getFileType(file.name).type,
      name: bucketFile.name,
      // url: 转换文件为 URL, 307
      url: `https://cloud.appwrite.io/v1/storage/buckets/${appwriteConfig.bucketId}/files/${bucketFile.$id}/view?project=${appwriteConfig.projectId}&mode=admin`,
      extension: getFileType(file.name).extension,
      size: bucketFile.sizeOriginal,
      ownerId,
      accountId,
      users: [],
      bucketFileId: bucketFile.$id,
    };
    console.log("fileDocument: ", fileDocument);

    const newFile = await databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        ID.unique(),
        fileDocument
      )
      .catch(async (error: unknown) => {
        await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
        handleError(error, "Failed to create file");
      });

    revalidatePath(path);
    return parseStringify(newFile);
  } catch (error) {
    handleError(error, "Failed to upload file");
  }
};

export const getFils = async () => {
  const { databases } = await createAdminClient();

  const createQueries = (currentUser: Models.Document) => {
    const queries = [
      Query.or([
        Query.equal("ownerId", [currentUser.$id]),
        Query.contains("users", [currentUser.email]),
      ]),
    ];

    return queries;
  };

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User not found");

    const queries = createQueries(currentUser);
    console.log("currentUser: ", currentUser);
    console.log("queries: ", queries);

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      queries
    );

    console.log("files: ", files);
    return parseStringify(files);
  } catch (error) {
    handleError(error, "Failed to get files");
  }
};

// 重命名文件
export const renameFile = async ({
  fileId,
  extension,
  path,
  name,
}: RenameFileProps) => {
  const { databases } = await createAdminClient();
  const newName = `${name}.${extension}`;

  try {
    const updateFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      {
        name: newName,
      }
    );

    revalidatePath(path);
    return parseStringify(updateFile);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};

// 重命名文件
export const updateFileUsers = async ({
  fileId,
  emails,
  path,
}: UpdateFileUsersProps) => {
  const { databases } = await createAdminClient();

  try {
    const updateFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      {
        users: emails,
      }
    );

    revalidatePath(path);
    return parseStringify(updateFile);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};
