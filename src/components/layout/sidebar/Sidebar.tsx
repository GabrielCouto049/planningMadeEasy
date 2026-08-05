import { Bell, CircleQuestionMark, Hammer, Home, Settings, type LucideIcon } from "lucide-react"
import type { LinkGroupType } from "./types/linkType"
import LinkGroup from "./components/LinkGroup"

const linkGroups: LinkGroupType[] = [
  {
    title: "Navegação",
    links: [
      { path: "/dashboard", title: "Dashboard", icon: Home },
      { path: "/projetos", title: "Projetos", icon: Hammer },
    ],
  },
]

const buttonIcons: LucideIcon[] = [Settings, Bell, CircleQuestionMark];

export default function Sidebar() {
  return (
    <aside className="row-start-2 -row-end-1 flex flex-col justify-between border-r border-sidebar-border bg-sidebar px-4 py-8">
      <div>
        {linkGroups.map((group) => (
          <LinkGroup
            key={group.title}
            title={group.title}
            links={group.links}
          />
        ))}
      </div>
      <footer className="flex items-center justify-around">
        {buttonIcons.map((_, index) => {
          const Icon = buttonIcons[index];

          return <button className="p-3 border border-gray-800 rounded-lg cursor-pointer">
            <Icon size={20}/>
          </button>
        })}
      </footer>
    </aside>
  )
}
