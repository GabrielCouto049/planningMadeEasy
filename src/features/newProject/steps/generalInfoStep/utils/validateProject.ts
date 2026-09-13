import type { GeneralInfoType } from "@/types/generalInfoType"

export type GeneralInfoErrors = {
  [K in keyof GeneralInfoType]?: string
}

export default function validateProject({
  title,
}: GeneralInfoType): GeneralInfoErrors {
  const foundErrors: GeneralInfoErrors = {}

  if (title.length === 0) {
    foundErrors.title = "Título inválido"
  }

  return foundErrors
}
