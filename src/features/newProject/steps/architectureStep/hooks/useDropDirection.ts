import { useEffect, useState } from "react"
import type { DropDirection } from "../types/dragData"

export function computeDropDirection(
  isFolder: boolean,
  yFraction: number
): DropDirection {
  if (isFolder) {
    if (yFraction < 1 / 3) return "before"
    if (yFraction > 2 / 3) return "after"
    return "inside"
  }

  return yFraction < 0.5 ? "before" : "after"
}

export function useDropDirection(
  ref: React.RefObject<HTMLElement | null>,
  isDropTarget: boolean,
  isFolder: boolean
): DropDirection | null {
  const [direction, setDirection] = useState<DropDirection | null>(null)

  useEffect(() => {
    if (!isDropTarget) return

    function handlePointerMove(event: PointerEvent) {
      const element = ref.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      if (rect.height === 0) return

      const fraction = (event.clientY - rect.top) / rect.height

      setDirection(computeDropDirection(isFolder, fraction))
    }

    window.addEventListener("pointermove", handlePointerMove)

    return () => window.removeEventListener("pointermove", handlePointerMove)
  }, [ref, isDropTarget, isFolder])

  return isDropTarget ? direction : null
}
