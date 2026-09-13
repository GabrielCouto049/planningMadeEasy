import { ProjectStyleCard } from "./components/ProjectStyleCard"
import ProjectStyleForm from "./components/ProjectStyleForm"
import ProjectStylePreview from "./components/ProjectStylePreview"
import { PROJECT_STYLE_CARDS } from "./constants/ProjectStyleCards"

export default function ProjectDesign() {
  return (
    <>
      <h1 className="sectionTitle">Design</h1>
      <main className="grid grid-cols-[2fr_1fr] gap-6">
        <section className="card space-y-6 p-6">
          <div className="grid grid-flow-col">
            {PROJECT_STYLE_CARDS.map((card) => (
              <ProjectStyleCard Icon={card.Icon} title={card.title} />
            ))}
          </div>
          <ProjectStyleForm />
        </section>
        <ProjectStylePreview />
      </main>
    </>
  )
}
