// Icons
import { MapPin, Zap, MoveRight } from "lucide-react";

// Routing
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <Link
      to={`/projects-and-testimonies/${project.slug}`}
      className="group flex flex-col cursor-pointer bg-[var(--card-blue)] rounded-xl overflow-hidden border border-[var(--card-blue)] hover:border-[var(--accent-yellow)] shadow-2xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          className="object-cover"
          src="/images/abt3.webp"
          alt={project.title}
        />

        <div className="absolute flex items-center gap-2 bottom-6 left-6 translate-y-13 ease-out group-hover:translate-y-0 transition-transform duration-300 z-1">
          <div className="text-medium font-semibold">View Detail</div>
          <div>
            <MoveRight className="size-4" />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"></div>
      </div>

      <div className="px-6 py-4 flex flex-col justify-between flex-1">
        <div className="text-xl font-bold">{project.title}</div>

        <p className="text-sm text-[var(--muted-gray)]">
          {project.description}
        </p>

        <div className="divider" />

        <div className="flex items-center gap-4 mb-2">
          <div className="text-sm text-[var(--muted-gray)]">Client:</div>
          <div className="text-sm font-semibold">{project.client}</div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="dark:bg-blue-950/30 flex items-center gap-2 py-2 px-4 rounded-lg w-fit">
            <MapPin className="size-4 text-blue-400" />
            <div className="text-sm font-medium">{project.location}</div>
          </div>

          <div className="dark:bg-amber-950/30 flex items-center gap-2 py-2 px-4 rounded-lg w-fit">
            <Zap className="size-4 text-[var(--accent-yellow)]" />
            <div className="text-sm font-medium">{project.capacity}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
