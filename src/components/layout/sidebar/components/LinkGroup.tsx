import { NavLink } from "react-router"
import type { LinkType } from "../types/linkType"

interface LinkGroupProps {
  title: string
  links: LinkType[]
}

export default function LinkGroup({ links, title }: LinkGroupProps) {
  return (
    <section>
      <h2 className="label text-xs">{title}</h2>
      <div className="flex flex-col gap-3">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <NavLink key={link.title} className="navlink" to={link.path}>
              <Icon size={20} />
              {link.title}
            </NavLink>
          )
        })}
      </div>
    </section>
  )
}
