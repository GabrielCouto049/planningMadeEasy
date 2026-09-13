import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field"
import useNewProjectStore from "@/features/newProject/stores/newProjectStore"
import { ColorPicker } from "./ColorPicker"
import { FontSelect } from "./FontSelect"
import { Slider } from "@/components/ui/slider"
import type { ColorCategory, FontCategory } from "../constants/FieldLabels"
import {
  ROUNDING_PRESETS,
  SHADOW_PRESETS,
  SPACING_PRESETS,
  type Shadowkey,
  type Spacingkey,
} from "../constants/StylePresets"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function ProjectStyleForm() {
  const colors = useNewProjectStore((state) => state.colors)
  const fonts = useNewProjectStore((state) => state.fonts)

  const rounding = useNewProjectStore((state) => state.rounding)
  const setRounding = useNewProjectStore((state) => state.setRounding)

  const shadow = useNewProjectStore((state) => state.shadow)
  const setShadow = useNewProjectStore((state) => state.setShadow)

  const spacing = useNewProjectStore((state) => state.spacing)
  const setSpacing = useNewProjectStore((state) => state.setSpacing)

  //AUX FUNCTION TO FIND THE POSITION OF CERTAIN KEY // MAY CAUSE PERFORMANCE ISSUES
  const roundingIndex = ROUNDING_PRESETS.findIndex(
    (preset) => preset.key === rounding
  )

  return (
    <form className="space-y-6">
      <FieldSet>
        <FieldLegend>Cores</FieldLegend>

        <FieldGroup className="flex flex-row flex-wrap">
          {Object.keys(colors).map((cat) => (
            <ColorPicker key={cat} cat={cat as ColorCategory} />
          ))}
        </FieldGroup>
      </FieldSet>
      <FieldSet>
        <FieldLegend>Tipografia</FieldLegend>

        <FieldGroup className="flex flex-row flex-wrap">
          {Object.keys(fonts).map((cat) => (
            <FontSelect key={cat} cat={cat as FontCategory} />
          ))}
        </FieldGroup>
      </FieldSet>
      <FieldSet>
        <FieldLegend>Arredondamento</FieldLegend>

        <Slider
          value={roundingIndex}
          max={ROUNDING_PRESETS.length - 1}
          step={1}
          onValueChange={(value) => {
            if (typeof value !== "number") return

            setRounding(ROUNDING_PRESETS[value].key)
          }}
        />

        <div className="flex items-center justify-between">
          {ROUNDING_PRESETS.map((preset) => (
            <Badge key={preset.key} variant="outline">
              {preset.label}
            </Badge>
          ))}
        </div>
      </FieldSet>

      <FieldSet>
        <FieldLegend>Sombreamento</FieldLegend>

        <RadioGroup
          value={shadow}
          onValueChange={(value) => setShadow(value as Shadowkey)}
          className="flex items-center justify-between"
        >
          {SHADOW_PRESETS.map((preset) => (
            <div key={preset.key} className="card flex flex-1 gap-3 p-3">
              <RadioGroupItem value={preset.key} id={preset.key} />

              <Label htmlFor={preset.key}>{preset.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </FieldSet>

      <FieldSet>
        <FieldLegend>Espaçamento</FieldLegend>{" "}
        <RadioGroup
          value={spacing}
          onValueChange={(value) => setSpacing(value as Spacingkey)}
          className="flex items-center justify-between"
        >
          {SPACING_PRESETS.map((preset) => (
            <div key={preset.key} className="card flex flex-1 gap-3 p-3">
              <RadioGroupItem value={preset.key} id={preset.key} />{" "}
              <Label htmlFor={preset.key}>{preset.label}</Label>{" "}
            </div>
          ))}
        </RadioGroup>
      </FieldSet>
    </form>
  )
}
