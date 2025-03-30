"use client";

import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { cn, getFileType } from "@/lib/utils";

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader: FC<Props> = ({ ownerId, accountId, className }) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button type="button" className={cn("flex text-stone-600", className)}>
        upload
        {/* img 24x24 */}
      </Button>
      {files.length > 0 && (
        <aside>
          <h4 className="text-light-100">uploading</h4>
          <ul>
            {files.map((file, index) => {
              const { type, extension } = getFileType(file.name);
              return (
                <li key={`${file.name}-${index}`} className="text-green-300">
                  {file.name} - {file.size} bytes
                </li>
              );
            })}
          </ul>
        </aside>
      )}
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default FileUploader;
