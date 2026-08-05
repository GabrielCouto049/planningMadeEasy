import type { LucideIcon } from "lucide-react";

type ProjectImage =
  | {
      type: "icon";
      value: LucideIcon;
    }
  | {
      type: "image";
      value: string;
    };

export interface ProjectType {
  id: string;
  title: string;
  image?: ProjectImage;
  progress: number;
  description: string;
  lastEdited: Date;
}