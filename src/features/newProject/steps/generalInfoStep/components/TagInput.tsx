import { useState, type KeyboardEvent } from "react"
import { XIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TagInputProps {
  className?: string
  placeholder?: string
  value?: string[]
  onChange?: (tags: string[]) => void
}

export default function TagInput({
  className,
  placeholder = "Digite e pressione Enter...",
  value = [],
  onChange,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("")

  const addTag = (tagValue: string) => {
    const trimmed = tagValue.trim()
    if (trimmed && !value.includes(trimmed)) {
      onChange?.([...value, trimmed])
    }
    setInputValue("")
  }

  const removeTag = (tag: string) => {
    onChange?.(value.filter((t) => t !== tag))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag(inputValue)
    }
    if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1])
    }
  }

  return (
    <div
      className={cn(
        "flex min-h-8 w-full flex-wrap items-center gap-1.5 rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-base transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        className
      )}
    >
      {value.map((tag) => (
        <Badge key={tag} variant="secondary" className="gap-1">
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="ml-0.5 rounded-full p-0.5 hover:bg-destructive/20 hover:text-destructive"
          >
            <XIcon className="size-3" />
          </button>
        </Badge>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ""}
        className="min-w-24 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  )
}
