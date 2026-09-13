import { Outlet } from "react-router"

import NavButtons from "./components/NavButtons"
import Stepper from "./components/Stepper"

export default function NewProject() {
  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
      <Stepper />
      <section className="h-full overflow-auto">
        <Outlet />
      </section>
      <NavButtons />
    </div>
  )
}
