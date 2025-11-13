// Icons
import { Star } from "lucide-react";

const TestimoniesCard = ({ testimony }) => {
  return (
    <div className="text-sm rounded-md bg-[var(--panel-blue)] p-6 space-y-4">
      <ul className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <li key={i}>
            <Star className={`size-5 text-[var(--accent-yellow)] ${i < testimony.rating ? "fill-[var(--accent-yellow)]" : ""}`} />
          </li>
        ))}
      </ul>

      <p className="text-[var(--muted-gray)] italic">{`"${testimony.description}"`}</p>

      <div className="mt-2">
        <div className="font-bold">{testimony.by}</div>
        <div className="text-xs text-[var(--muted-gray)] font-medium">
          {testimony.company}
        </div>
      </div>
    </div>
  );
};

export default TestimoniesCard;
