import { Outlet } from "react-router"

import Stepper from "./components/Stepper"
import NavButtons from "./components/NavButtons"

export default function NewProject() {
  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto] gap-6">
      <Stepper />
      <section className="overflow-auto">
        <Outlet />
      </section>
      <NavButtons />
    </div>
  )
}
