// Component
import PageNavigationHeader from "../components/layout/PageNavigationHeader";

// UI
import ProjectCard from "../components/ui/ProjectCard";

// Data
import { projects } from "../../constants";

// Styling
import "../assets/css/pages/ProjectAndTestimonies.css";

const ProjectsAndTestimonies = () => {
  return (
    <div className="bg-[var(--bg-dark)]">
      <PageNavigationHeader
        h1="Our"
        h1Yellow="Project Portfolio"
        p="Delivering reliable power solutions across diverse industries and applications"
        id="projects-testimonies-page-hero"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Projects & Testimonies" },
        ]}
      />

      <section className="section-container py-22 text-white">
        <div className="text-center space-y-6">
          <div className="font-bold text-6xl">Featured Projects</div>
          <p className="text-[var(--muted-gray)] text-balance">
            Successful installations across healthcare, manufacturing, data
            centers, retail, and municipal applications showcasing our diverse
            expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-22">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectsAndTestimonies;
