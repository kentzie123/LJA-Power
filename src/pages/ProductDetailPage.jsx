// Hooks
import { useState } from "react";

// Routing
import { useParams, useNavigate } from "react-router-dom";

// Components
import SpecificationTab from "../components/layout/ApplicationTab";
import FeaturesTab from "../components/layout/FeaturesTab";
import ApplicationTab from "../components/layout/ApplicationTab";
import CertificationsTab from "../components/layout/CertificationsTab";

//Data
import { generators } from "../../constants";

// Icons
import {
  ArrowLeft,
  Share2,
  Heart,
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

  return (
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
            <div className="flex items-center space-x-4">
              <button className="p-2 text-[#a9b6bd] hover:text-white">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 text-[#a9b6bd] hover:text-[#f5ec19]">
                <Heart className="h-5 w-5" />
              </button>
            </div>
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
                {product.category.toUpperCase()} • {product.type.toUpperCase()}{" "}
                SERIES
              </span>
              <h1 className="text-3xl font-bold text-white mb-2">
                {product.name}
              </h1>
              <p className="text-[#a9b6bd]">{product.description}</p>
            </div>

            {/* Key Specifications */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#145d77] p-4 rounded-lg border border-[#1a6d8a]">
                <div className="flex items-center mb-2">
                  <Zap className="h-5 w-5 text-[#f5ec19] mr-2" />
                  <span className="font-medium text-white">Standby Power</span>
                </div>
                <p className="text-lg font-semibold text-white">
                  {product.standbyPower}
                </p>
              </div>
              <div className="bg-[#145d77] p-4 rounded-lg border border-[#1a6d8a]">
                <div className="flex items-center mb-2">
                  <Gauge className="h-5 w-5 text-[#f5ec19] mr-2" />
                  <span className="font-medium text-white">Prime Power</span>
                </div>
                <p className="text-lg font-semibold text-white">
                  {product.primePower}
                </p>
              </div>
              <div className="bg-[#145d77] p-4 rounded-lg border border-[#1a6d8a]">
                <div className="flex items-center mb-2">
                  <Cog className="h-5 w-5 text-[#f5ec19] mr-2" />
                  <span className="font-medium text-white">Engine</span>
                </div>
                <p className="text-sm font-semibold text-white">
                  {product.engine}
                </p>
              </div>
              <div className="bg-[#145d77] p-4 rounded-lg border border-[#1a6d8a]">
                <div className="flex items-center mb-2">
                  <Fuel className="h-5 w-5 text-[#f5ec19] mr-2" />
                  <span className="font-medium text-white">Fuel Type</span>
                </div>
                <p className="text-sm font-semibold text-white">
                  {product.fuelType}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-[#0f4b5a] rounded-lg border border-[#145d77] p-6 mb-6">
              <h3 className="font-semibold text-white mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#f5ec19] flex-shrink-0" />
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

        {/* Detailed Information Tabs */}
        <div className="mt-12">
          <div className="border-b border-[#145d77]">
            <nav className="flex space-x-8">
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
  );
};

export default ProductDetailPage;
