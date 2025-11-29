// Icons
import { Zap, ShieldCheck, Fuel, Gauge } from "lucide-react";

// Routing
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card group overflow-hidden flex flex-col h-full bg-[var(--card-blue)] rounded-lg border border-[var(--accent-yellow)]/20 hover:border-[var(--accent-yellow)]/60 hover:shadow-[0_4px_20px_rgba(246,231,42,0.15)] hover:-translate-y-1 transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black/20">
        <img
          className="group-hover:scale-110 transition-transform duration-700 w-full h-full object-cover"
          src={product.images[0]}
          alt={product.name}
          loading="lazy" // Performance Boost
          width="400" // Aspect Ratio Hint
          height="300"
          onError={(e) => {
            e.target.src = "/images/placeholder-generator.jpg";
          }}
        />
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-blue)] via-transparent to-transparent opacity-80" />

        {/* Power Badge */}
        <div className="absolute top-3 right-3 bg-[var(--accent-yellow)] text-black px-3 py-1 rounded-md text-xs font-bold font-heading uppercase tracking-wide shadow-md">
          {product.standbyPower.split("/")[0].trim()}
        </div>
      </div>

      {/* Content */}
      <div className="card-content p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          <h3 className="text-xl font-bold font-heading uppercase tracking-wide text-[var(--accent-yellow)] mb-3 leading-tight group-hover:text-white transition-colors">
            {product.name}
          </h3>

          {/* Power Specifications Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4 bg-black/20 p-2 rounded-md border border-white/5">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[var(--muted-gray)]">
                Standby
              </span>
              <span className="text-white font-bold text-sm">
                {product.standbyPower}
              </span>
            </div>
            <div className="flex flex-col border-l border-white/10 pl-2">
              <span className="text-[10px] uppercase tracking-wider text-[var(--muted-gray)]">
                Prime
              </span>
              <span className="text-white font-bold text-sm">
                {product.primePower}
              </span>
            </div>
          </div>

          {/* Key Features List */}
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-[var(--accent-yellow)] flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[var(--muted-gray)] leading-snug">
                <span className="text-gray-300 font-medium">
                  {product.engine}
                </span>{" "}
                Engine
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Fuel className="w-4 h-4 text-[var(--accent-yellow)] flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[var(--muted-gray)]">
                {product.fuelType} • {product.speed}
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Gauge className="w-4 h-4 text-[var(--accent-yellow)] flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[var(--muted-gray)] truncate">
                {product.voltageOptions.split(",")[0]}...{" "}
                {/* Truncate long volt list */}
              </div>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-yellow)] flex-shrink-0" />
              <div className="text-xs text-[var(--muted-gray)]">
                Sound Proof Enclosure
              </div>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <Link to={`/products/${product.slug}`} className="block">
            <button className="w-full bg-[var(--accent-yellow)] text-black hover:bg-[var(--panel-blue)] hover:text-white py-3 px-4 rounded-md transition-all duration-300 font-heading font-bold uppercase tracking-wider text-sm shadow-sm hover:shadow-md cursor-pointer border border-transparent hover:border-white/20">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
