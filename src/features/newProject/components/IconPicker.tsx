import {
  Folder,
  FileCode,
  Globe,
  Palette,
  Boxes,
  Terminal,
  Rocket,
  UploadIcon,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProjectImage } from "@/types/generalInfoType"

const ICONS: { icon: LucideIcon; label: string }[] = [
  { icon: Folder, label: "Folder" },
  { icon: FileCode, label: "FileCode" },
  { icon: Globe, label: "Globe" },
  { icon: Palette, label: "Palette" },
  { icon: Boxes, label: "Boxes" },
  { icon: Terminal, label: "Terminal" },
  { icon: Rocket, label: "Rocket" },
]

interface IconPickerProps {
  value: ProjectImage
  onChange: (value: ProjectImage) => void
  className?: string
}

export default function IconPicker({
  value,
  onChange,
  className,
}: IconPickerProps) {
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    const url = URL.createObjectURL(file)

    onChange({ type: "image", url })
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex flex-wrap items-center gap-2">
        {ICONS.map((item) => {
          const isSelected = value.type === "icon" && value.icon === item.icon

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onChange({ type: "icon", icon: item.icon })}
              className={cn(
                "flex size-10 items-center justify-center rounded-lg border transition-colors",
                isSelected
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              title={item.label}
            >
              <item.icon className="size-5" />
            </button>
          )
        })}

        <label
          className={cn(
            "flex size-10 cursor-pointer items-center justify-center rounded-lg border border-dashed transition-colors",
            value.type === "image"
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
          title="Upload de imagem"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {value.type === "image" ? (
            <img
              src={value.url}
              alt="Preview"
              className="size-full rounded-lg object-cover"
            />
          ) : (
            <UploadIcon className="size-5" />
          )}
        </label>
      </div>
    </div>
  )
}
