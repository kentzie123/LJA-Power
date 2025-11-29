// Icons
import { MapPin, ArrowRight } from "lucide-react";

// Routing
import { Link } from "react-router-dom";

// Note: Assuming the prop is still named 'project' from the list page mapping
const OurWorkCard = ({ project }) => {
  return (
    <Link to={`/our-works/${project.slug}`} className="group block h-full">
      <div className="relative overflow-hidden rounded-xl bg-[var(--card-blue)] border border-white/10 hover:border-[var(--accent-yellow)] transition-all duration-300 h-full flex flex-col hover:-translate-y-1 hover:shadow-2xl">
        {/* Image Area */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            // ✅ PERFORMANCE FIX: Add width/height and lazy loading
            width="400"
            height="250"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.src = "/images/placeholder-generator.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)]/80 to-transparent" />

          {/* ✅ Job Type Badge (e.g., DELIVERY) */}
          <div className="absolute top-4 left-4">
            <span className="bg-[var(--accent-yellow)] text-black text-[10px] font-bold font-heading uppercase tracking-wider px-3 py-1 rounded-sm shadow-md">
              {project.category || "Service"}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Title */}
            <h3 className="font-heading text-xl font-bold uppercase leading-tight mb-3 text-white group-hover:text-[var(--accent-yellow)] transition-colors">
              {project.title}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-2 text-[var(--muted-gray)] text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="size-3 text-[var(--accent-yellow)]" />
              {project.location}
            </div>

            <p className="text-[var(--muted-gray)] text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Footer Metadata */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
            <span className="font-heading uppercase tracking-wide">
              Completed: {project.details?.completedDate || "Recently"}
            </span>
            <ArrowRight className="size-4 text-[var(--accent-yellow)] -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OurWorkCard;
