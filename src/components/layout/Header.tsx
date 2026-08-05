import { Image, SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
 

export default function Header() {
  return (
    <header className="col-start-1 -col-end-1 bg-gray-300 flex items-center justify-between p-6">
      <div className="flex items-center gap-3">
        <Image />
        PlanningMadeEasy
      </div>
      <InputGroup className="card px-2 py-4 w-111">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
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
