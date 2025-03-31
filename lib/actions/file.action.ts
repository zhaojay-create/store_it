"use server";

import { UploadFileProps } from "@/types";
import { createAdminClient } from "../appwrite";
import { handleError } from "./base";
import { InputFile } from "node-appwrite/file";
import { appwriteConfig } from "../appwrite/config";
import { ID } from "node-appwrite";
import { getFileType, parseStringify } from "../utils";
import { error } from "console";
import { revalidatePath } from "next/cache";

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

    const fileDocument = {
      type: getFileType(file.name).type,
      name: bucketFile.name,
      url: bucketFile,
      extension: getFileType(file.name).extension,
      size: bucketFile.sizeOriginal,
      ownerId,
      accountId,
      users: [],
      bucketFileId: bucketFile.$id,
    };

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
