import type { NewProjectState } from "@/features/newProject/stores/newProjectStore"
import type { StateCreator } from "zustand"
import type { ColorCategory, FontCategory } from "../constants/FieldLabels"
import type {
  Roundingkey,
  Shadowkey,
  Spacingkey,
} from "../constants/StylePresets"

export interface DesignSliceType {
  colors: Record<ColorCategory, string>
  fonts: Record<FontCategory, string>

  rounding: Roundingkey
  shadow: Shadowkey
  spacing: Spacingkey

  setColors: (cat: ColorCategory, newValue: string) => void
  setFont: (cat: FontCategory, newValue: string) => void
  setRounding: (newValue: Roundingkey) => void
  setShadow: (newValue: Shadowkey) => void
  setSpacing: (newValue: Spacingkey) => void
}

export const initialDesignState = {
  colors: {
    primary: "#000000",
    secundary: "#000000",
    neutral: "#000000",
    background: "#000000",
  },

  fonts: {
    base: "Inter",
    functional: "Inter",
    headings: "Inter",
  },

  rounding: "large",
  shadow: "medium",
  spacing: "spacious",
} as const

export const DesignSlice: StateCreator<
  NewProjectState,
  [["zustand/immer", never]],
  [],
  DesignSliceType
> = (set) => ({
  ...initialDesignState,

  setColors(cat, newValue) {
    set((state) => {
      state.colors[cat] = newValue
    })
  },

  setFont(cat, newValue) {
    set((state) => {
      state.fonts[cat] = newValue
    })
  },

  setRounding(newValue) {
    set((state) => {
      state.rounding = newValue
    })
  },

  setShadow(newValue) {
    set((state) => {
      state.shadow = newValue
    })
  },

  setSpacing(newValue) {
    set((state) => {
      state.spacing = newValue
    })
  },
})
