"use client";

import { FC, useCallback, useState } from "react";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Thumbnail from "./Thumbnail";
import Image from "next/image";
import { MAX_FILE_SIZE } from "@/constants";
import { uploadFile } from "@/lib/actions/file.action";
import { usePathname } from "next/navigation";

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader: FC<Props> = ({ ownerId, accountId, className }) => {
  const path = usePathname();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      // Do something with the files
      console.log(acceptedFiles);
      setFiles(acceptedFiles);
      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((pre) => pre.filter((f) => f.name !== file.name));
          return toast(
            <p className="text-white border-y-2">
              <span className="font-semibold">
                {file.name} - {file.size} bytes max file size is 50mb
              </span>
            </p>
          );
        }
        // upload 文件
        return uploadFile({
          file,
          ownerId,
          accountId,
          path: path,
        }).then((uploadFile) => {
          // 如果上传文件成功，展示的 loading 就会消失
          if (uploadFile) {
            setFiles((pre) => pre.filter((f) => f.name !== file.name));
          }
        });
      });
      // 等待所有文件的上传
      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLButtonElement>,
    fileName: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setFiles((pre) => pre.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button type="button" className={cn("flex text-stone-600", className)}>
        upload
        {/* img 24x24 */}
      </Button>
      {files.length > 0 && (
        <aside className="fixed bottom-4 right-4 z-100 bg-white p-4 shadow-lg rounded-lg">
          <h4 className="text-light-100">uploading</h4>
          <ul>
            {files.map((file, index) => {
              const { type, extension } = getFileType(file.name);
              return (
                <li key={`${file.name}-${index}`} className="text-green-300">
                  {file.name} - {file.size} bytes
                  <div className="flex items-center gap-3.5">
                    <Thumbnail
                      type={type}
                      extension={extension as string}
                      url={convertFileToUrl(file)}
                    />
                    <div className="flex flex-col">
                      {file.name}
                      <Image
                        src="/assets/loader.gif"
                        width={80}
                        height={22}
                        alt="loader"
                      />
                    </div>
                    <Button onClick={(e) => handleRemoveFile(e, file.name)}>
                      X
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>
      )}
      {/* {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )} */}
    </div>
  );
};

export default FileUploader;
