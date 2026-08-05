import { Hammer, Home } from "lucide-react"
import type { LinkGroupType } from "./types/linkType"
import LinkGroup from "./components/LinkGroup"

const linkGroups: LinkGroupType[] = [
  {
    title: "Navegação",
    links: [
      { path: "/dashboard", title: "Dashboard", icon: Home },
      { path: "/allProjects", title: "Projetos", icon: Hammer },
    ],
  },
]

export default function Sidebar() {
  return (
    <aside className="row-start-2 -row-end-1 bg-gray-400 py-12 px-6">
      {linkGroups.map((group) => (
        <LinkGroup key={group.title} title={group.title} links={group.links} />
      ))}
    </aside>
  )
}
