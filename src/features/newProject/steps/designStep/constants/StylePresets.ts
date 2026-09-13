export interface Preset<Tkey extends string, TValue = string | number> {
  key: Tkey
  label: string
  value: TValue
}

export type Roundingkey = "squared" | "small" | "medium" | "large" | "full"

export type Shadowkey = "none" | "soft" | "medium" | "intense"

export type Spacingkey = "compact" | "comfortable" | "spacious"

export const ROUNDING_PRESETS: Preset<Roundingkey>[] = [
  { key: "squared", label: "Quadrado", value: "0px" },
  { key: "small", label: "Pequeno", value: "4px" },
  { key: "medium", label: "Médio", value: "8px" },
  { key: "large", label: "Grande", value: "16px" },
  { key: "full", label: "Total", value: "9999px" },
]

export const SHADOW_PRESETS: Preset<Shadowkey>[] = [
  { key: "none", label: "Sem Sombra", value: "none" },
  { key: "soft", label: "Suave", value: "0 2px 4px rgba(0,0,0,0.1)" },
  { key: "medium", label: "Média", value: "0 4px 6px rgba(0,0,0,0.1)" },
  { key: "intense", label: "Intensa", value: "0 10px 15px rgba(0,0,0,0.2)" },
]

export const SPACING_PRESETS: Preset<Spacingkey>[] = [
  { key: "compact", label: "Compacto", value: "0.5rem" },
  { key: "comfortable", label: "Confortável", value: "1rem" },
  { key: "spacious", label: "Espaçoso", value: "2rem" },
]
