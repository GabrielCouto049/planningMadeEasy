import Header from "@/components/layout/Header"
import Sidebar from "@/components/layout/sidebar/Sidebar"
import { Outlet } from "react-router"

export function App() {
  return (
    <main className="h-screen grid grid-rows-[72px_1fr] grid-cols-[280px_1fr] bg-background font-sans text-foreground">
      <Header />
      <Sidebar />
      <section className="row-start-2 -row-end-1 col-start-2 -col-end-1 overflow-y-auto p-8 lg:p-12">
        <Outlet />
      </section>
    </main>
  )
}

export default App
