// Styling
import "../assets/css/pages/ProjectDetailsPage.css";

// Routing
import { useParams, Link } from "react-router-dom";

// Icons
import {
  ArrowLeft,
  MapPin,
  Zap,
  Clock,
  Calendar,
  Target,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

// Data
import { projects } from "../../constants";

const ProjectDetailsPage = () => {
  const { slug } = useParams();

  const project = projects.find((project) => project.slug === slug);

  return (
    <div className="bg-[var(--bg-dark)] text-white">
      <section className="project-details-header relative py-32">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)] to-[var(--bg-dark)/90]"></div>

        <div className="section-container">
          <div className="relative pt-21 space-y-8">
            <Link
              to="/projects-and-testimonies"
              className="flex items-center btn-backdrop gap-2 w-fit px-4 rounded-full"
            >
              <ArrowLeft className="size-4" />
              <div>Back to Projects</div>
            </Link>

            <div className="bg-[var(--accent-yellow)] px-4 py-2 w-fit rounded-md text-black text-sm font-semibold">
              {project.details.completedDate}
            </div>

            <h1 className="font-bold text-5xl lg:text-7xl">{project.title}</h1>

            <p className="text-medium lg:text-xl">{project.description}</p>

            <div className="w-fit flex gap-4">
              <Link to="/contacts" className="btn-yellow">
                Request Quote
              </Link>
              <Link
                to="/services"
                className="btn-blue border-[var(--card-blue)]"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section-container">
        <section>
          <div className=" grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[var(--card-blue)] flex-center flex-col py-8 rounded-xl gap-2">
              <MapPin className="text-[var(--accent-yellow)] size-8" />
              <div className="text-sm text-[var(--muted-gray)]">Location</div>
              <div className="text-lg font-bold text-center">
                {project.location}
              </div>
            </div>
            <div className="bg-[var(--card-blue)] flex-center flex-col py-8 rounded-xl gap-2">
              <Zap className="text-[var(--accent-yellow)] size-8" />
              <div className="text-sm text-[var(--muted-gray)]">Capacity</div>
              <div className="text-lg font-bold text-center">
                {project.capacity}
              </div>
            </div>
            <div className="bg-[var(--card-blue)] flex-center flex-col py-8 rounded-xl gap-2">
              <Clock className="text-[var(--accent-yellow)] size-8" />
              <div className="text-sm text-[var(--muted-gray)]">Duration</div>
              <div className="text-lg font-bold text-center">
                {project.details.duration}
              </div>
            </div>
            <div className="bg-[var(--card-blue)] flex-center flex-col py-8 rounded-xl gap-2">
              <Calendar className="text-[var(--accent-yellow)] size-8" />
              <div className="text-sm text-[var(--muted-gray)]">Completed</div>
              <div className="text-lg font-bold text-center">
                {project.details.completedDate}
              </div>
            </div>
          </div>
        </section>

        <div className="h-[1px] bg-gray-700 my-10"></div>

        <section className="py-22 space-y-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="text-[var(--accent-yellow)] font-medium">
                CLIENT
              </div>
              <div className="font-bold text-4xl">{project.client}</div>
              <p className="text-[var(--muted-gray)] text-lg leading-relaxed">
                We partnered with {project.client} to deliver a comprehensive
                power solution that meets their specific operational
                requirements and exceeds industry standards.
              </p>
            </div>

            <div className="bg-[var(--accent-yellow)]/10 border border-[var(--accent-yellow)]/20 rounded-xl flex flex-col  justify-center gap-4 p-8">
              <div className="text-2xl font-bold">Project Overview</div>
              <p>{project.description}</p>
            </div>
          </div>

          <div className="space-y-10">
            <div className="text-center space-y-2">
              <div className="font-bold text-4xl">Our Approach</div>
              <p className="text-lg text-[var(--muted-gray)]">
                From challenge to success - here's how we delivered exceptional
                results
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-[var(--card-blue)] p-8 flex flex-col gap-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="bg-error/15 p-3 rounded-xl text-error">
                    <Target className="size-6" />
                  </div>
                  <div className="text-2xl font-bold">Challenge</div>
                </div>
                <div>{project.details.challenges}</div>
              </div>

              <div className="bg-[var(--card-blue)] p-8 flex flex-col gap-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/15 p-3 rounded-xl text-primary">
                    <Lightbulb className="size-6" />
                  </div>
                  <div className="text-2xl font-bold">Solution</div>
                </div>
                <div>{project.details.solution}</div>
              </div>

              <div className="bg-[var(--card-blue)] p-8 flex flex-col gap-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="bg-success/15 p-3 rounded-xl text-success">
                    <CheckCircle2 className="size-6" />
                  </div>
                  <div className="text-2xl font-bold">Outcome</div>
                </div>
                <div>{project.details.outcome}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-[var(--panel-blue)] py-22 text-center">
        <div className="flex flex-col items-center gap-6 section-container">
          <div className="font-bold text-6xl">Have a Similar Project?</div>
          <p className="text-lg text-[var(--muted-gray)]">
            Contact our team to discuss your power generation needs and get a
            customized solution tailored to your specific requirements.
          </p>
          <div className="flex gap-4">
            <Link to="/contacts" className="btn-yellow">
              Get in Touch
            </Link>
            <Link to="/projects-and-testimonies" className="btn-blue">
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailsPage;
