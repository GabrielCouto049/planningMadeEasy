import type { LucideIcon } from "lucide-react";

export interface LinkType {
    path: string,
    title: string,
    icon: LucideIcon
}

export interface LinkGroupType {
    title: string,
    links: LinkType[],
}