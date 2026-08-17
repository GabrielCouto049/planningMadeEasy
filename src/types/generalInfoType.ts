import type { LucideIcon } from "lucide-react"

type ProjectImage =
  | {
      type: "icon"
      value: LucideIcon
    }
  | {
      type: "image"
      value: string
    }

export default interface GeneralInfoType {
  title: string
  image?: ProjectImage
  description: string
  stack: {
    language: string
    framework: string
  }
  libs: string[]
  problemSolved: string
  targetAudience: string
}
