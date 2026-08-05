import { Outlet } from "react-router"

import Stepper from "./components/Stepper"

export default function NewProject() {
  return (
    <div>
      <Stepper />
      <section className="mt-12">
        <Outlet />
      </section>
    </div>
  )
}
