import type { LucideIcon } from "lucide-react"

export type ProjectImage =
  | {
      type: "icon"
      icon: LucideIcon
    }
  | {
      type: "image"
      url: string
    }

export interface StackType {
  language: string
  framework: string
}

export default interface GeneralInfoType {
  title: string
  image?: ProjectImage
  description: string
  stack: StackType
  libs: string[]
  problemSolved: string
  targetAudience: string
}
