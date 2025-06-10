import { Header } from "@/components/header/header";
import { JourneyView } from "@/views/journey.view/journey.view";
import { CompetenceView } from "@/views/competence.view/competence-view";
import { ProjectsView } from "@/views/projetcts.view/projects.view";

export default function Home() {
  return (
    <>
      <Header />
      <CompetenceView />
      <JourneyView />
      <ProjectsView />
    </>
  );
}
