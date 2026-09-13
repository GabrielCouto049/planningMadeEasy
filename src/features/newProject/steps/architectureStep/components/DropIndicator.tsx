import type { DropDirection } from "../types/dragData"

export default function DropIndicator({
  direction,
}: {
  direction: DropDirection | null
}) {
  if (direction === "before") {
    return (
      <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 rounded-full bg-accent" />
    )
  }

  if (direction === "after") {
    return (
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent" />
    )
  }

  return null
}
