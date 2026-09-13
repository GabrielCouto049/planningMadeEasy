import useNewProjectStore from "@/features/newProject/stores/newProjectStore"
import { Field, FieldLabel } from "@/components/ui/field"
import type { ColorCategory } from "../constants/FieldLabels"
import { COLOR_LABELS } from "../constants/FieldLabels"

export function ColorPicker({ cat }: { cat: ColorCategory }) {
  const colors = useNewProjectStore((state) => state.colors)
  const setColors = useNewProjectStore((state) => state.setColors)

  return (
    <Field className="flex-1">
      <FieldLabel className="text-sm text-muted-foreground">
        {COLOR_LABELS[cat]}
      </FieldLabel>

      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-2">
        <input
          type="color"
          value={colors[cat]}
          className="h-8 w-8 cursor-pointer rounded-sm border-none p-0 outline-none"
          onChange={(e) => setColors(cat, e.target.value)}
        />

        <span className="text-sm">{colors[cat]}</span>
      </label>
    </Field>
  )
}
