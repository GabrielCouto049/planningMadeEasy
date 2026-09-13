export type ColorCategory = "primary" | "secundary" | "neutral" | "background"
export type FontCategory = "base" | "headings" | "functional"

export const COLOR_LABELS: Record<ColorCategory, string> = {
  primary: "Primária",
  secundary: "Secundária",
  neutral: "Neutra",
  background: "Fundo",
}

export const FONT_LABELS: Record<FontCategory, string> = {
  base: "Base",
  functional: "Funcional",
  headings: "Títulos",
}
