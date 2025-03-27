"use client";

import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader: FC<Props> = ({ ownerId, accountId, className }) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button type="button" className={cn("flex text-stone-600", className)}>
        upload img 24x24
      </Button>
      {files.length > 0 && (
        <aside>
          <h4 className="text-light-100">uploading</h4>
          <ul>
            {files.map((file) => (
              <li key={file.name}>
                {file.name} - {file.size} bytes
              </li>
            ))}
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
