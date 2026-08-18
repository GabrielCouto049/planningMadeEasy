import type GeneralInfoType from "@/types/generalInfoType"

export default function validateProject({title} : GeneralInfoType) : boolean {
    if (title.length === 0) return false
    return true
}