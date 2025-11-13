
const SpecificationTab = ({product}) => {
  return (
    <div className="space-y-8">
      {/* Generator Set Specifications */}
      <div>
        <div className="text-lg font-semibold text-white mb-4">
          Generator Set Specifications
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Standby Power", value: product.standbyPower },
            { label: "Prime Power", value: product.primePower },
            { label: "Speed", value: product.speed },
            { label: "Frequency", value: product.frequency },
            { label: "Starting Voltage", value: product.startingVoltage },
            { label: "Fuel Capacity", value: product.fuelCapacity },
            { label: "Dimensions", value: product.dimensions },
            { label: "Weight", value: product.weight },
          ].map((spec, index) => (
            <div
              key={index}
              className="bg-[#0f4b5a] p-4 rounded-lg border border-[#145d77]"
            >
              <span className="font-medium text-white">{spec.label}</span>
              <p className="text-[#a9b6bd]">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Engine Specifications */}
      <div>
        <div className="text-lg font-semibold text-white mb-4">
          Engine Specifications
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(product.engineSpecs).map(([key, value]) => (
            <div
              key={key}
              className="bg-[#0f4b5a] p-4 rounded-lg border border-[#145d77]"
            >
              <span className="font-medium text-white capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <p className="text-[#a9b6bd]">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alternator Specifications */}
      <div>
        <div className="text-lg font-semibold text-white mb-4">
          Alternator Specifications
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(product.alternatorSpecs).map(([key, value]) => (
            <div
              key={key}
              className="bg-[#0f4b5a] p-4 rounded-lg border border-[#145d77]"
            >
              <span className="font-medium text-white capitalize">{key}</span>
              <p className="text-[#a9b6bd]">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificationTab;
