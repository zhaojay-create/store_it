"use client";

import React, { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { SortDescIcon } from "lucide-react";
import { sortTypes } from "@/constants";

interface SortProps {}

const Sort: FC<SortProps> = ({}) => {
  const path = usePathname();
  const router = useRouter();

  const handleSort = (value: string) => {
    router.push(`${path}?sort=${value}`);
  };

  return (
    <div>
      <Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={sortTypes[0].label} />
        </SelectTrigger>
        <SelectContent>
          {sortTypes.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sort;
