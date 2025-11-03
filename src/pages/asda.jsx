import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import SpecificationTab from "../components/layout/SpecificationTab";
import FeaturesTab from "../components/layout/FeaturesTab";
import ApplicationTab from "../components/layout/ApplicationTab";
import CertificationsTab from "../components/layout/CertificationsTab";

import { generators } from "../../constants";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0c2430] pt-[60px] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Product Not Found
          </h1>
          <button
            onClick={() => navigate("/products")}
            className="bg-[#f5ec19] text-[#0c2430] px-6 py-2 rounded-lg hover:bg-[#e6dc17] transition-colors font-semibold"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // ✅ Dynamic JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description:
      product.description || "High-performance generator by LJA Power.",
    sku: product.slug,
    brand: {
      "@type": "Brand",
      name: "LJA Power",
    },
    category: product.category,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "56",
    },
    offers: {
      "@type": "Offer",
      url: `https://ljapower-revised.netlify.app/products/${product.slug}`,
      priceCurrency: "PHP",
      price: product.price || "0",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "LJA Power Limited Co.",
      },
    },
  };

  return (
    <>
      <Helmet>
        {/* 🔹 Meta Title & Description */}
        <title>{`${product.name} | LJA Power Limited Co.`}</title>
        <meta
          name="description"
          content={`Buy ${product.name} — a dependable ${product.category} generator featuring ${product.engine} engine and ${product.standbyPower} standby power. Ideal for commercial and industrial use.`}
        />

        {/* 🔹 Canonical URL */}
        <link
          rel="canonical"
          href={`https://ljapower-revised.netlify.app/products/${product.slug}`}
        />

        {/* 🔹 Open Graph (Facebook, LinkedIn) */}
        <meta property="og:type" content="product" />
        <meta
          property="og:title"
          content={`${product.name} | LJA Power Limited Co.`}
        />
        <meta
          property="og:description"
          content={`Explore ${product.name} — ${product.description}`}
        />
        <meta property="og:image" content={product.images[0]} />
        <meta
          property="og:url"
          content={`https://ljapower-revised.netlify.app/products/${product.slug}`}
        />
        <meta property="og:site_name" content="LJA Power Limited Co." />

        {/* 🔹 Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${product.name} | LJA Power Limited Co.`}
        />
        <meta
          name="twitter:description"
          content={
            product.description || "High-performance generator by LJA Power."
          }
        />
        <meta name="twitter:image" content={product.images[0]} />

        {/* 🔹 Preload Hero Image */}
        <link
          rel="preload"
          as="image"
          href={product.images[0]}
          fetchpriority="high"
        />

        {/* 🔹 Structured Data (Rich Snippets) */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ✅ Your existing layout stays unchanged */}
      <div className="min-h-screen bg-[#0c2430] pt-[60px]">
        {/* Navigation */}
        <nav className="bg-[#0f4b5a] shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => navigate("/products")}
                className="flex items-center text-[#a9b6bd] hover:text-white"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Generators
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="overflow-hidden rounded-lg shadow-lg border border-[#145d77] mb-4">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    className="w-full h-full object-contain transition-transform duration-500"
                    src={product.images[activeImage]}
                    alt={product.name}
                    loading="eager"
                    fetchpriority="high"
                    onError={(e) => {
                      e.target.src = "/images/placeholder-generator.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_50%,_#0c2430_100%)]" />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`group overflow-hidden rounded-lg border-2 ${
                      activeImage === index
                        ? "border-[#f5ec19]"
                        : "border-[#145d77]"
                    }`}
                  >
                    <div className="relative aspect-square">
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
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
            <div>
              <div className="mb-6">
                <span className="inline-block bg-[#145d77] text-[#f5ec19] text-sm px-3 py-1 rounded-full mb-2 font-semibold">
                  {product.category.toUpperCase()} •{" "}
                  {product.type.toUpperCase()} SERIES
                </span>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {product.name}
                </h1>
                <p className="text-[#a9b6bd]">{product.description}</p>
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
                    className="bg-[#145d77] p-4 rounded-lg border border-[#1a6d8a]"
                  >
                    <div className="flex items-center mb-2">
                      <Icon className="h-5 w-5 text-[#f5ec19] mr-2" />
                      <span className="font-medium text-white">{label}</span>
                    </div>
                    <p className="text-lg font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>

              {/* Key Features */}
              <div className="bg-[#0f4b5a] rounded-lg border border-[#145d77] p-6 mb-6">
                <h3 className="font-semibold text-white mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#f5ec19]" />
                      <span className="text-[#a9b6bd]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Operation Conditions */}
              <div className="bg-[#0f4b5a] rounded-lg border border-[#145d77] p-4 mb-6">
                <h3 className="font-semibold text-white mb-3">
                  Operation Conditions
                </h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-[#f5ec19]" />
                    <span className="text-[#a9b6bd]">
                      Altitude: {product.operationConditions.altitude}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-[#f5ec19]" />
                    <span className="text-[#a9b6bd]">
                      Temp: {product.operationConditions.temperature}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#f5ec19]" />
                    <span className="text-[#a9b6bd]">
                      Derating: {product.operationConditions.derating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button className="w-full bg-[#f5ec19] text-[#0c2430] py-3 px-6 rounded-lg hover:bg-[#e6dc17] transition-colors font-semibold text-lg">
                  Request Quote
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center bg-[#145d77] text-[#a9b6bd] border border-[#1a6d8a] py-3 px-6 rounded-lg hover:bg-[#1a6d8a] hover:text-white transition-colors">
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </button>
                  <button className="flex items-center justify-center bg-[#145d77] text-[#a9b6bd] border border-[#1a6d8a] py-3 px-6 rounded-lg hover:bg-[#1a6d8a] hover:text-white transition-colors">
                    <Mail className="h-5 w-5 mr-2" />
                    Email Us
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12">
            <div className="border-b border-[#145d77]">
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
                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? "border-[#f5ec19] text-[#f5ec19]"
                        : "border-transparent text-[#a9b6bd] hover:text-white hover:border-[#a9b6bd]"
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
