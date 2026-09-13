import { Field, FieldLabel } from "@/components/ui/field"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

import type { FontCategory } from "../constants/FieldLabels"
import { FONT_LABELS } from "../constants/FieldLabels"

import FONT_NAMES from "@/lib/google-font-names.json"
import useNewProjectStore from "@/features/newProject/stores/newProjectStore"

//USING SET TO PERFORM A CHECK BEFORE UPDATE THE STORE, USING SET GIVES US A O(1) OPERATION
const FONT_NAMES_SET = new Set(FONT_NAMES)

export function FontSelect({ cat }: { cat: FontCategory }) {
  const setFont = useNewProjectStore((state) => state.setFont)

  return (
    <Field className="flex-1">
      <FieldLabel className="text-sm text-muted-foreground">
        {FONT_LABELS[cat]}
      </FieldLabel>

      <Combobox
        items={FONT_NAMES}
        limit={50}
        onValueChange={(value) => {
          if (typeof value === "string" && FONT_NAMES_SET.has(value)) {
            setFont(cat, value)
          }
        }}
      >
        <ComboboxInput placeholder="Selecione uma fonte" />

        <ComboboxContent>
          <ComboboxEmpty>Nenhuma fonte encontrada.</ComboboxEmpty>

          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item} className="p-2">
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  )
}
