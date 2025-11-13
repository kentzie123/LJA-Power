// Icons
import { MapPin, Phone, Clock, Navigation, PhoneCall } from "lucide-react";

// Routing
import { Link } from "react-router-dom";

const ContactCard = ({ contact, setLocation, selectedContact }) => {
  return (
    <div
      onClick={() => {
        setLocation(contact);
      }}
      className={`bg-[var(--panel-blue)] rounded-2xl p-6 space-y-4 hover:brightness-110 cursor-pointer ${
        contact === selectedContact
          ? "border-2 border-[var(--accent-yellow)]"
          : ""
      } `}
    >
      <div className="flex gap-4">
        <div className="bg-[var(--accent-yellow)]/20 p-3 rounded-xl h-fit">
          <MapPin className="text-[var(--accent-yellow)] size-6" />
        </div>

        <div>
          <div className="font-semibold text-xl">{contact.office}</div>

          <p className="text-sm text-[var(--muted-gray)]">{contact.address}</p>
        </div>
      </div>

      <div>
        <Phone className="text-[var(--accent-yellow)] size-4 inline me-2" />
        <span className="text-sm text-[var(--muted-gray)]">
          {contact.number}
        </span>
      </div>

      <div className="flex gap-2">
        <Clock className="size-4 text-[var(--accent-yellow)]" />
        <div className="text-sm space-y-1">
          {contact.schedules.map((sched, i) => (
            <div key={i} className="text-[var(--muted-gray)]">
              {sched}
            </div>
          ))}

          <div className="text-[var(--accent-yellow)]">
            Emergency Service: 24/7
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link
          to={`tel:${contact.number}`}
          className="btn-yellow space-x-2 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          <PhoneCall className="size-4" />
          <span>Call</span>
        </Link>

        <Link
          to={contact.direction}
          target="_blank"
          className="btn-blue space-x-2 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          <Navigation className="size-4" />
          <span className="text-sm">Directions</span>
        </Link>
      </div>
    </div>
  );
};

export default ContactCard;
