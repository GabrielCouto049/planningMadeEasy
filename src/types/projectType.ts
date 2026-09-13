import type { FolderNode } from "./folderTreeTypes"
import type { GeneralInfoType } from "./generalInfoType"
import type { ProjectDesignType } from "./designType"

export interface ProjectType {
  id: string
  lastEdited: Date
  progress: number
  general: GeneralInfoType
  folderArch: { root: FolderNode }
  design: ProjectDesignType
}
