import { useState, useRef } from "react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComboboxFieldProps {
  suggestions?: string[]
  placeholder?: string
  className?: string
}

export default function ComboboxField({
  suggestions = [],
  placeholder = "Digite para buscar...",
  className,
}: ComboboxFieldProps) {
  const [inputValue, setInputValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const filtered = suggestions.filter((s) =>
    s.toLowerCase().includes(inputValue.toLowerCase())
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1))
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, -1))
    }
    if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault()
      setInputValue(filtered[selectedIndex])
      setIsOpen(false)
    }
    if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  const handleSelect = (value: string) => {
    setInputValue(value)
    setIsOpen(false)
  }

  return (
    <div className={cn("relative", className)}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
          setSelectedIndex(-1)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="formTextInput flex h-8 w-full items-center justify-between pr-8"
        autoComplete="off"
      />
      <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      {isOpen && filtered.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border bg-popover p-1 text-popover-foreground shadow-md"
        >
          {filtered.map((item, index) => (
            <li
              key={item}
              onMouseDown={() => handleSelect(item)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={cn(
                "flex cursor-default items-center rounded-md px-2 py-1.5 text-sm outline-none select-none",
                index === selectedIndex && "bg-accent text-accent-foreground"
              )}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
