import PageNavigationHeader from "../components/layout/PageNavigationHeader";
import ProjectCard from "../components/ui/ProjectCard";
import { projects } from "../../constants";
import "../assets/css/pages/ProjectAndTestimonies.css";
import { Helmet } from "react-helmet";

const ProjectsAndTestimonies = () => {
  return (
    <div className="bg-[var(--bg-dark)]">
      <Helmet>
        <title>Projects | LJA Power Limited Co</title>
        <meta
          name="description"
          content="Explore LJA Power Limited Co’s completed generator installations, power solutions, and successful projects across hospitals, factories, commercial sites, data centers, and more."
        />
        <meta
          name="keywords"
          content="LJA Power projects, generator installations Philippines, power solutions, generator supplier, genset installation, LJA Power Limited Co, industrial generators, commercial generators"
        />
        <meta
          property="og:title"
          content="Project Portfolio | LJA Power Limited Co"
        />
        <meta
          property="og:description"
          content="Showcasing our successful generator installations and power projects across different industries."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lja-power.com/projects" />
        <meta
          property="og:image"
          content="https://lja-power.com/images/ServicesPageHeroImg.webp"
        />
        <link rel="canonical" href="https://lja-power.com/projects" />
      </Helmet>

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
