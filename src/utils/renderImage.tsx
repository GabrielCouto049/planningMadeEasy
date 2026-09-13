import type { ReactNode } from "react"
import type { ProjectImage } from "../types/generalInfoType"
import { Image } from "lucide-react"

// === RENDERS A DIFFERENT COMPONENT DEPENDING ON THE IMAGE TYPE === //

export const renderImage = (image?: ProjectImage): ReactNode => {
  if (!image) return <Image size={20} />

  if (image.type === "icon") {
    const Icon = image.icon
    return <Icon size={24} strokeWidth={1.5} />
  }

  return <img src={image.url} alt="Project Image" className="h-full w-full" />
}

// ===== //
