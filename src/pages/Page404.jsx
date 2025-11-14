// SEO
import { Helmet } from "react-helmet";

// Routing
import { Link } from "react-router-dom";

// Icons
import { AlertTriangle } from "lucide-react";

const Page404 = () => {
  return (
    <>
      <Helmet>
        <title>404 | LJA Power Limited Co</title>
        <meta
          name="description"
          content="The page you are looking for could not be found. Visit LJA Power Limited Co’s homepage to continue exploring our services."
        />
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f4b5a] text-white text-center px-6">
        <AlertTriangle size={72} className="text-[var(--accent-yellow)] mb-6" />
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="max-w-md text-[var(--muted-gray)] mb-8">
          Oops! The page you’re looking for doesn’t exist or has been moved.
          Let’s get you back to the right place.
        </p>
        <Link
          to="/"
          className="bg-[var(--accent-yellow)] text-[#0f4b5a] px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition-all"
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
};

export default Page404;
