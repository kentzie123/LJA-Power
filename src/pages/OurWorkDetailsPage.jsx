// SEO
import SEO from "../components/layout/SEO";

// Styling
import "../assets/css/pages/ProjectDetailsPage.css";

// Routing
import { useParams, Link } from "react-router-dom";

// Icons
import {
  ArrowLeft,
  MapPin,
  FileText, 
  Clock,
  Calendar,
  Layers, 
} from "lucide-react";

// Data
import { works } from "../../constants";

const OurWorkDetailsPage = () => {
  const { slug } = useParams();
  const project = works.find((work) => work.slug === slug);

  if (!project) {
    return (
      <div className="bg-[var(--bg-dark)] min-h-screen flex items-center justify-center text-white">
        <title>Work Not Found | LJA Power Limited Co.</title>
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold mb-4 uppercase">
            Work Not Found
          </h1>
          <Link
            to="/our-works"
            className="btn-yellow font-heading uppercase tracking-wider"
          >
            Back to Our Works
          </Link>
        </div>
      </div>
    );
  }

  const finalImageUrl = project.image
    ? `https://lja-power.com${project.image}`
    : "https://lja-power.com/images/default-project.webp";

  return (
    <div className="bg-[var(--bg-dark)] text-white">
      <SEO
        title={project.title}
        description={project.description}
        url={`https://lja-power.com/our-works/${project.slug}`}
        image={finalImageUrl}
      />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: project.title,
          description: project.description,
          image: finalImageUrl,
          author: { "@type": "Organization", name: "LJA Power Limited Co." },
          publisher: {
            "@type": "Organization",
            name: "LJA Power Limited Co.",
            logo: {
              "@type": "ImageObject",
              url: "https://lja-power.com/images/lja-logo.png",
            },
          },
          datePublished: project.details.completedDate,
        })}
      </script>

      <section className="project-details-header relative py-32">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)] to-[var(--bg-dark)]/90"></div>
        <div className="section-container">
          <div className="relative pt-21 space-y-8">
            <Link
              to="/our-works"
              className="flex items-center btn-backdrop gap-2 w-fit px-4 py-2 rounded-full font-heading uppercase tracking-wide border-white/20 hover:border-white/50 transition-colors"
            >
              <ArrowLeft className="size-4" />
              <div>Back to Our Works</div>
            </Link>

            <div className="bg-[var(--accent-yellow)] px-4 py-2 w-fit rounded-md text-black text-sm font-semibold font-heading uppercase">
              JOB TYPE: {project.category}
            </div>

            <h1 className="font-bold text-5xl lg:text-7xl font-heading uppercase tracking-tight leading-none">
              {project.title}
            </h1>

            <p className="text-gray-300 lg:text-xl">{project.description}</p>

            <div className="w-fit flex gap-4">
              <Link
                to="/contacts"
                className="btn-yellow font-heading uppercase tracking-wider"
              >
                Request Quote
              </Link>
              <Link
                to="/services"
                className="btn-blue font-heading uppercase tracking-wider"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section-container">
        <section className="py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[var(--card-blue)] flex-center flex-col py-8 rounded-xl gap-2 hover:shadow-xl transition-shadow border border-white/10">
              <MapPin className="text-[var(--accent-yellow)] size-8" />
              <div className="text-sm text-[var(--muted-gray)] font-heading uppercase">
                Location
              </div>
              <div className="text-lg font-bold font-heading uppercase text-center">
                {project.location}
              </div>
            </div>

            <div className="bg-[var(--card-blue)] flex-center flex-col py-8 rounded-xl gap-2 hover:shadow-xl transition-shadow border border-white/10">
              <Layers className="text-[var(--accent-yellow)] size-8" />
              <div className="text-sm text-[var(--muted-gray)] font-heading uppercase">
                SERVICE CATEGORY
              </div>
              <div className="text-lg font-bold font-heading uppercase text-center">
                {project.category}
              </div>
            </div>

            <div className="bg-[var(--card-blue)] flex-center flex-col py-8 rounded-xl gap-2 hover:shadow-xl transition-shadow border border-white/10">
              <Clock className="text-[var(--accent-yellow)] size-8" />
              <div className="text-sm text-[var(--muted-gray)] font-heading uppercase">
                JOB DURATION
              </div>
              <div className="text-lg font-bold font-heading uppercase text-center">
                {project.details.duration}
              </div>
            </div>

            <div className="bg-[var(--card-blue)] flex-center flex-col py-8 rounded-xl gap-2 hover:shadow-xl transition-shadow border border-white/10">
              <Calendar className="text-[var(--accent-yellow)] size-8" />
              <div className="text-sm text-[var(--muted-gray)] font-heading uppercase">
                COMPLETED DATE
              </div>
              <div className="text-lg font-bold font-heading uppercase text-center">
                {project.details.completedDate}
              </div>
            </div>
          </div>
        </section>

        <div className="h-[1px] bg-gray-700/50 my-16"></div>

        {/* SECTION 2: JOB SUMMARY & VISUAL PROOF (The Narrative) */}
        <section className="pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Column 1: Summary/Action */}
            <div className="space-y-6 lg:col-span-1 border-l-4 border-[var(--accent-yellow)] pl-4">
              <div className="font-heading text-lg tracking-widest text-[var(--accent-yellow)] uppercase flex items-center gap-2">
                <FileText className="size-5" /> JOB DESCRIPTION
              </div>
              <h2 className="font-heading font-bold text-4xl uppercase tracking-tight leading-snug text-white">
                The scope of work included:
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Column 2 & 3: Visual Proof/Technical Info */}
            <div className="lg:col-span-2 relative">
              {/* Large Image/Visual Proof */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-[var(--card-blue)] group">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  src={finalImageUrl}
                  alt={`Photo of ${project.title} operation`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>

              {/* Optional: Capacity Detail Box */}
              {project.details.capacity &&
                project.details.capacity !== "N/A" && (
                  <div className="absolute -bottom-4 -right-4 bg-[var(--accent-yellow)] text-black p-4 rounded-lg font-heading font-bold uppercase text-center shadow-2xl transform rotate-1">
                    UNIT RATING: {project.details.capacity}
                  </div>
                )}
            </div>
          </div>
        </section>
      </div>

      {/* FINAL CTA */}
      <section className="bg-[var(--panel-blue)] py-22 text-center border-t border-[var(--accent-yellow)]/20">
        <div className="flex flex-col items-center gap-6 section-container">
          <div className="font-bold text-6xl font-heading uppercase tracking-tight">
            Have a Similar Project?
          </div>
          <p className="text-lg text-[var(--muted-gray)]">
            Contact our team to discuss your power generation needs and get a
            customized solution tailored to your specific requirements.
          </p>
          <div className="flex gap-4">
            <Link
              to="/contacts"
              className="btn-yellow font-heading uppercase tracking-wider"
            >
              Get in Touch
            </Link>
            <Link
              to="/our-works"
              className="btn-blue font-heading uppercase tracking-wider"
            >
              View All Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurWorkDetailsPage;
