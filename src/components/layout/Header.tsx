import { Image, SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
  return (
    <header className="col-start-1 -col-end-1 flex items-center justify-between border-b border-border bg-background p-4 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Image className="size-5" />
        </div>
        <span className="text-base font-semibold tracking-tight">
          PlanningMadeEasy
        </span>
      </div>

      <InputGroup className="card px-3 py-2 w-111">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon align="inline-end">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  )
}
