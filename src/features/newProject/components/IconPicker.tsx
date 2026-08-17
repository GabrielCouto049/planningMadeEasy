import { useState } from "react"
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
  className?: string
}

export default function IconPicker({ className }: IconPickerProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setSelectedIndex(null)
    }
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex flex-wrap items-center gap-2">
        {ICONS.map((item, index) => {
          const Icon = item.icon
          const isSelected = selectedIndex === index

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setSelectedIndex(index)
                setPreviewUrl(null)
              }}
              className={cn(
                "flex size-10 items-center justify-center rounded-lg border transition-colors",
                isSelected
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              title={item.label}
            >
              <Icon className="size-5" />
            </button>
          )
        })}

        <label
          className={cn(
            "flex size-10 cursor-pointer items-center justify-center rounded-lg border border-dashed transition-colors",
            previewUrl
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
          {previewUrl ? (
            <img
              src={previewUrl}
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
