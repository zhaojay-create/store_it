import { Models } from "node-appwrite";
import React, { FC } from "react";

interface CardProps {
  file: Models.Document;
}

const Card: FC<CardProps> = ({ file }) => {
  return <div>{file.name}</div>;
};

export default Card;
