import {
  FileCode,
  FileImage,
  FileQuestionMark,
  FileText,
  type LucideIcon,
} from "lucide-react"
import type { FileType } from "@/types/folderTreeTypes"

export const TREE_ICONS: Record<FileType, LucideIcon> = {
  code: FileCode,
  image: FileImage,
  text: FileText,
}

export const DEFAULT_TREE_ICON: LucideIcon = FileQuestionMark

export function getTreeIcon(kind: FileType): LucideIcon {
  return TREE_ICONS[kind] ?? DEFAULT_TREE_ICON
}

export const fileTypeLib: Record<string, FileType> = {
  txt: "text",

  js: "code",
  jsx: "code",
  ts: "code",
  tsx: "code",
  css: "code",
  html: "code",
  json: "code",

  png: "image",
  jpg: "image",
  jpeg: "image",
  svg: "image",
}
