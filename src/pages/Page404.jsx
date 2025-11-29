// Routing
import { Link } from "react-router-dom";

// Icons
import { AlertTriangle } from "lucide-react";

const Page404 = () => {
  return (
    <>
      {/* 1. SEO FIX: NOINDEX directive prevents Google from indexing this error page */}
      <title>Page Not Found | LJA Power Limited Co.</title>
      <meta
        name="description"
        content="The page you are looking for could not be found. Visit LJA Power Limited Co’s homepage to continue exploring our services."
      />
      <meta name="robots" content="noindex" />

      <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-dark)] text-white text-center px-6">
        <AlertTriangle
          size={72}
          className="text-[var(--accent-yellow)] mb-6 animate-pulse"
        />

        {/* 2. INDUSTRIAL FONT APPLICATION */}
        <h1 className="font-heading text-8xl md:text-9xl font-bold mb-2 text-white/50 select-none tracking-tight leading-none">
          404
        </h1>

        <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase mb-4 tracking-wide text-white">
          Page Not Found
        </h2>

        <p className="max-w-md text-[var(--muted-gray)] mb-8 text-lg leading-relaxed">
          Oops! The page you’re looking for doesn’t exist or has been moved.
          Let’s get you back to the right place.
        </p>

        <Link
          to="/"
          // Used btn-yellow utility and applied Oswald font styling
          className="btn-yellow px-8 py-3 rounded-lg font-heading font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-[var(--accent-yellow)]/50"
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
};

export default Page404;
