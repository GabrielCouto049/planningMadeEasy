import type GeneralInfoType from "./generalInfoType";

export interface ProjectType {
  id: string;
  lastEdited: Date;
  progress: number;
  general: GeneralInfoType;
  // folderArch: FolderArchType;
  // design: DesignInfoType;
}