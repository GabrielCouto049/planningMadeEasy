import type {
  Roundingkey,
  Shadowkey,
  Spacingkey,
} from "@/features/newProject/steps/designStep/constants/StylePresets"
import type {
  ColorCategory,
  FontCategory,
} from "@/features/newProject/steps/designStep/constants/FieldLabels"

export interface ProjectDesignType {
  colors: Record<ColorCategory, string>
  fonts: Record<FontCategory, string>
  rounding: Roundingkey
  shadow: Shadowkey
  spacing: Spacingkey
}
