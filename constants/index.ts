import { Label } from "@radix-ui/react-label";

export const NavItems = [
  { name: "Dashboard", icon: "/assets/logo.png", url: "/" },
  { name: "Documents", icon: "/assets/logo.png", url: "/documents" },
  { name: "Images", icon: "/assets/logo.png", url: "/images" },
  { name: "Media", icon: "/assets/logo.png", url: "/media" },
  { name: "Others", icon: "/assets/logo.png", url: "/others" },
];

export const MAX_FILE_SIZE = 50 * 1024 * 1024;

export const actionsDropdownItems = [
  { label: "Rename", value: "rename", icon: "" },
  { label: "Details", value: "details", icon: "" },
  { label: "Share", value: "share", icon: "" },
  { label: "Download", value: "download", icon: "" },
  { label: "Delete", value: "delete", icon: "" },
];
