// Icons
import { Check } from "lucide-react";

const FeaturesTab = ({ product }) => {
  return (
    <div className="bg-[#0f4b5a] rounded-lg border border-[#145d77] p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {product.features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check className="h-5 w-5 text-[#f5ec19] mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-[#a9b6bd]">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesTab;
