// Icons
import { ChevronRight, CircleCheck } from "lucide-react";

const ServicesCard = ({ service, selectedService, setSelectedService }) => {
  const Icon = service.icon;

  const openCloseServiceAccordion = () => {
    setSelectedService((prev) => (prev?.id === service.id ? null : service));
  };

  const isAccordionOpen = service.id === selectedService?.id;

  return (
    <div>
      <div
        onClick={openCloseServiceAccordion}
        className="cursor-pointer hover:bg-[var(--card-blue)]/15"
      >
        <div className="h-[1px] bg-[#1c3640]"></div>

        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-4 my-8 py-6">
            <div
              className={`${service.darkColor} size-12 rounded-md flex-center`}
            >
              <Icon />
            </div>
            <div>
              <div className="text-3xl font-bold">{service.title}</div>
              <p className="text-[var(--muted-gray)]">{service.tagline}</p>
            </div>
          </div>

          <ChevronRight
            className={` transition-transform ${
              service.id === selectedService?.id ? "rotate-90" : ""
            }`}
          />
        </div>
      </div>

      {/* Service Details */}
      {isAccordionOpen && (
        <div className="py-6 px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                className="object-cover h-full w-full rounded-lg"
                src={service.image}
                alt={service.title}
              />
            </div>
            <div className="space-y-4">
              <div className="font-bold text-xl">Overview</div>
              <p className="text-[var(--muted-gray)] text-lg">
                {service.fullDescription}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-15">
            <div className="space-y-4">
              <div className="font-bold text-xl">Process</div>
              <div className="space-y-4">
                {service.process.map((proc, i) => (
                  <div className="flex items-center gap-4" key={i}>
                    <div
                      className={`size-8 bg-gradient-to-br flex-center ${service.color} rounded-full`}
                    >
                      {i + 1}
                    </div>
                    <div className="text-lg text-[var(--muted-gray)]">
                      {proc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="font-bold text-xl">Key Benefits</div>
              <div className="space-y-4">
                {service.benefits.map((benefit, i) => (
                  <div className="flex items-center gap-4" key={i}>
                    <CircleCheck className="text-[var(--accent-yellow)]"/>
                    <div className="text-lg text-[var(--muted-gray)]">
                      {benefit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesCard;
