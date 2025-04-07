import { Label } from "@radix-ui/react-label";

export const NavItems = [
  {
    name: "Dashboard",
    activeIcon: "/assets/dashboard_active.svg",
    icon: "/assets/dashboard.svg",
    url: "/",
  },
  {
    name: "Documents",
    activeIcon: "/assets/document_active.svg",
    icon: "/assets/document.svg",
    url: "/documents",
  },
  {
    name: "Images",
    activeIcon: "/assets/image_active.svg",
    icon: "/assets/image.svg",
    url: "/images",
  },
  {
    name: "Media",
    activeIcon: "/assets/media_active.svg",
    icon: "/assets/media.svg",
    url: "/media",
  },
  {
    name: "Others",
    activeIcon: "/assets/other_active.svg",
    icon: "/assets/other.svg",
    url: "/others",
  },
];

export const MAX_FILE_SIZE = 50 * 1024 * 1024;

export const actionsDropdownItems = [
  { label: "Rename", value: "rename", icon: "" },
  { label: "Details", value: "details", icon: "" },
  { label: "Share", value: "share", icon: "" },
  { label: "Download", value: "download", icon: "" },
  { label: "Delete", value: "delete", icon: "" },
];

export const sortTypes = [
  { label: "Created Time (Latest)", value: "$createdAt-desc" },
  { label: "Created Time (Oldest)", value: "$createdAt-asc" },
  { label: "Name(A-Z)", value: "name-asc" },
  { label: "Name(Z-A)", value: "name-desc" },
  { label: "Size(Highest)", value: "size-desc" },
  { label: "Size(Lowest)", value: "size-asc" },
];
