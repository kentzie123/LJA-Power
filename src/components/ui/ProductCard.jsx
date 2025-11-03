// Icons
import { Zap, ShieldCheck, Fuel, Gauge } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card group overflow-hidden flex flex-col h-full bg-[#0f4b5a] rounded-lg border border-[var(--panel-blue)] hover:border-[var(--accent-yellow)]/60 hover:shadow-[5px_3px_10px_0_var(--accent-yellow)]/20 hover:translate-y-[-5px] hover:translate-x-[-3px] transition-all  duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          className="group-hover:scale-110 transition-transform duration-500 w-full h-full object-cover"
          src={product.images[0]}
          alt={product.name}
          onError={(e) => {
            e.target.src = "/images/placeholder-generator.jpg";
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_50%,_#0c2430_100%)]" />

        {/* Power Badge */}
        <div className="absolute top-3 right-3 bg-[#f5ec19] text-[#0c2430] px-2 py-1 rounded-full text-xs font-bold">
          {product.standbyPower.split("/")[0].trim()}
        </div>
      </div>

      <div className="card-content p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="text-lg font-bold text-[#f5ec19] mb-2">
            {product.name}
          </div>

          {/* Power Specifications */}
          <div className="mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#a9b6bd]">Standby:</span>
              <span className="text-white font-medium">
                {product.standbyPower}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#a9b6bd]">Prime:</span>
              <span className="text-white font-medium">
                {product.primePower}
              </span>
            </div>
          </div>

          {/* Key Features */}
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#f5ec19] flex-shrink-0" />
              <div className="text-sm text-[#a9b6bd]">
                <span className="font-medium text-white">{product.engine}</span>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Fuel className="w-4 h-4 text-[#f5ec19] flex-shrink-0" />
              <div className="text-sm text-[#a9b6bd]">
                {product.fuelType} • {product.speed}
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#f5ec19] flex-shrink-0" />
              <div className="text-sm text-[#a9b6bd]">
                {product.voltageOptions.split(",")[0]}...
              </div>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#f5ec19] flex-shrink-0" />
              <div className="text-sm text-[#a9b6bd]">
                Sound Proof Enclosure
              </div>
            </li>
          </ul>

          {/* Additional Info */}
          <div className="mt-3 pt-3 border-t border-[#145d77]">
            <div className="flex justify-between text-xs text-[#a9b6bd]">
              <span>Weight: {product.weight}</span>
              <span>Fuel: {product.fuelCapacity}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => {
              // Navigate to product detail page
              window.location.href = `/products/${product.slug}`;
            }}
            className="w-full bg-[var(--panel-blue)] text-white hover:bg-[var(--accent-yellow)] hover:text-black py-2 px-4 rounded-lg transition-colors font-medium border"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
