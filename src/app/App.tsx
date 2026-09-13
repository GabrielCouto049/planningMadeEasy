import Header from "@/components/layout/Header"
import Sidebar from "@/components/layout/sidebar/Sidebar"
import { Outlet } from "react-router"

export function App() {
  return (
    <main className="grid h-screen grid-cols-[280px_1fr] grid-rows-[72px_1fr] bg-background font-sans text-foreground">
      <Header />
      <Sidebar />
      <section className="col-start-2 -col-end-1 row-start-2 -row-end-1 overflow-y-auto p-4 lg:p-8">
        <Outlet />
      </section>
    </main>
  )
}

export default App
