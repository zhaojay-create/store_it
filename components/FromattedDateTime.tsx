import { cn, formatDate } from "@/lib/utils";
import React, { FC } from "react";

interface FromattedDateTimeProps {
  date: string;
  className: string;
}

const FromattedDateTime: FC<FromattedDateTimeProps> = ({ date, className }) => {
  return (
    <p className={cn("text-muted-foreground text-sm", className)}>
      {formatDate(date)}
    </p>
  );
};

export default FromattedDateTime;
