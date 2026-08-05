import type { ReactNode } from "react"
import type { ProjectType } from "../types/projectType"
import { Image } from "lucide-react"

// === RENDERS A DIFFERENT COMPONENT DEPENDING ON THE IMAGE TYPE === //

export const renderImage = (image: ProjectType["image"]): ReactNode => {
  if (!image) return <Image size={20} />

  if (image.type === "icon") {
    const Icon = image.value
    return <Icon size={24} strokeWidth={1.5} />
  }

  return <img src={image.value} alt="Project Image" className="h-full w-full" />
}

// ===== //
