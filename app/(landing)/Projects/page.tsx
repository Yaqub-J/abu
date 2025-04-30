import OngoingProjects from "./sections/OngoingProjects";
import ProjectsPage from "./sections/Projectspage";
import ProjectsSection from "./sections/ProjectsSection";
import ShotsSection from "./sections/ShotsSection";

export default function Projects() {
  return (
    <div>
      <ProjectsSection />
      <ShotsSection />
      <OngoingProjects />
      <ProjectsPage />
    </div>
  );
}