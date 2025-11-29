// SEO
import SEO from "../components/layout/SEO";

// Hooks
import { useState } from "react";

// Routing
import { useParams, useNavigate, Link } from "react-router-dom";

// Components
import SpecificationTab from "../components/layout/SpecificationTab";
import FeaturesTab from "../components/layout/FeaturesTab";
import ApplicationTab from "../components/layout/ApplicationTab";
import CertificationsTab from "../components/layout/CertificationsTab";

// Data
import { generators } from "../../constants";

// Icons
import {
  ArrowLeft,
  Check,
  Phone,
  Mail,
  Zap,
  Fuel,
  Gauge,
  Cog,
  Activity,
  Thermometer,
  Mountain,
} from "lucide-react";

const ProductDetailPage = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("specifications");
  const navigate = useNavigate();
  const { slug } = useParams();

  const product = generators.find((items) => items.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--bg-dark)] pt-[60px] flex items-center justify-center text-white">
        <title>Product Not Found | LJA Power Limited Co.</title>
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold uppercase mb-4">
            Product Not Found
          </h1>
          <button
            onClick={() => navigate("/products")}
            className="btn-yellow px-6 py-2 font-heading uppercase tracking-wider"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Construct the image URL safely
  const productImageUrl = `https://lja-power.com${product.images[0]}`;

  return (
    <>
      {/* 3. The SEO Component (Handles Title, Meta, OpenGraph) */}
      <SEO
        title={product.name}
        description={
          product.description ||
          `Buy ${product.name} - ${product.standbyPower} generator. Reliable power solutions from LJA Power Limited Co.`
        }
        url={`https://lja-power.com/products/${product.slug}`}
        image={productImageUrl}
      />

      {/* 4. The Product Schema (Crucial for Rich Results) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          name: product.name,
          image: product.images.map((img) => `https://lja-power.com${img}`),
          description: product.description,
          category: product.category,
          brand: { "@type": "Brand", name: "LJA Power Limited Co." },
          offers: {
            "@type": "Offer",
            url: `https://lja-power.com/products/${product.slug}`,
            priceCurrency: "PHP",
            availability: "https://schema.org/InStock",
          },
        })}
      </script>

      <div className="min-h-screen bg-[var(--bg-dark)] pt-[60px]">
        {/* Navigation */}
        <nav className="bg-[var(--card-blue)] shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => navigate("/products")}
                className="flex items-center text-[var(--muted-gray)] hover:text-white font-heading uppercase tracking-wider text-sm"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Generators
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="overflow-hidden rounded-lg shadow-2xl border border-[var(--panel-blue)] mb-4">
                <div className="relative aspect-[4/3] overflow-hidden bg-black/20">
                  <img
                    className="w-full h-full object-contain transition-transform duration-500"
                    src={product.images[activeImage]}
                    alt={product.name}
                    loading="eager"
                    fetchPriority="high"
                    width="600"
                    height="450"
                    onError={(e) => {
                      e.target.src = "/images/placeholder-generator.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_50%,_var(--bg-dark)_100%)]" />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`group overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                      activeImage === index
                        ? "border-[var(--accent-yellow)] shadow-lg"
                        : "border-[var(--panel-blue)] hover:border-white/50"
                    }`}
                  >
                    <div className="relative aspect-square">
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        width="150"
                        height="150"
                        onError={(e) => {
                          e.target.src = "/images/placeholder-generator.jpg";
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="mb-6">
                <span className="inline-block bg-[var(--panel-blue)] text-[var(--accent-yellow)] text-xs px-3 py-1 rounded-full mb-2 font-heading uppercase tracking-wider">
                  {product.category.toUpperCase()} •{" "}
                  {product.type.toUpperCase()} SERIES
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold font-heading uppercase tracking-tight text-white mb-2 leading-tight">
                  {product.name}
                </h1>
                <p className="text-[var(--muted-gray)] text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  {
                    icon: Zap,
                    label: "Standby Power",
                    value: product.standbyPower,
                  },
                  {
                    icon: Gauge,
                    label: "Prime Power",
                    value: product.primePower,
                  },
                  { icon: Cog, label: "Engine", value: product.engine },
                  { icon: Fuel, label: "Fuel Type", value: product.fuelType },
                ].map(({ icon: Icon, label, value }, i) => (
                  <div
                    key={i}
                    className="bg-[var(--panel-blue)] p-4 rounded-lg border border-[var(--card-blue)] shadow-md"
                  >
                    <div className="flex items-center mb-2">
                      <Icon className="h-5 w-5 text-[var(--accent-yellow)] mr-2" />
                      <span className="font-heading uppercase text-xs text-[var(--muted-gray)]">
                        {label}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-white font-heading">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Operation Conditions */}
              <div className="bg-[var(--card-blue)] rounded-lg border border-[var(--panel-blue)] p-4 mb-6">
                <div className="font-heading font-semibold text-white mb-3 uppercase tracking-wider text-sm">
                  Operation Conditions
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm text-[var(--muted-gray)]">
                  <div className="flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-[var(--accent-yellow)]" />
                    <span className="text-xs">
                      Altitude: {product.operationConditions.altitude}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-[var(--accent-yellow)]" />
                    <span className="text-xs">
                      Temp: {product.operationConditions.temperature}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[var(--accent-yellow)]" />
                    <span className="text-xs">
                      Derating: {product.operationConditions.derating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <Link
                  to="/contacts"
                  className="w-full btn-yellow font-heading uppercase tracking-wider text-lg py-3"
                >
                  Request Quote
                </Link>
                <div className="grid grid-cols-2 gap-4 text-white">
                  <a
                    href="tel:09157495102"
                    className="flex items-center justify-center btn-blue font-heading uppercase tracking-wider text-base py-3"
                    aria-label="Call Now"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </a>
                  <a
                    href="mailto:lja.ljapowerlimitedco@gmail.com"
                    className="flex items-center justify-center btn-blue font-heading uppercase tracking-wider text-base py-3"
                    aria-label="Email Us"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12 lg:mt-20">
            <div className="border-b border-[var(--panel-blue)]">
              <nav className="flex space-x-8 overflow-x-auto">
                {[
                  "specifications",
                  "features",
                  "applications",
                  "certifications",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-heading font-bold uppercase tracking-wide text-sm transition-colors duration-300 ${
                      activeTab === tab
                        ? "border-[var(--accent-yellow)] text-[var(--accent-yellow)]"
                        : "border-transparent text-[var(--muted-gray)] hover:text-white hover:border-white/30"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-8">
              {activeTab === "specifications" && (
                <SpecificationTab product={product} />
              )}
              {activeTab === "features" && <FeaturesTab product={product} />}
              {activeTab === "applications" && (
                <ApplicationTab product={product} />
              )}
              {activeTab === "certifications" && (
                <CertificationsTab product={product} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
