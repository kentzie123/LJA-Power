const InfoCard = ({ icon, title, desc }) => {
  return (
    <div className="bg-[var(--card-blue)] rounded-2xl p-8 text-center shadow-lg">
      <div className="flex justify-center mb-4">
        <div className="bg-[var(--accent-yellow)]/15 rounded-full p-4">{icon}</div>
      </div>
      <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>
      <p className="text-[var(--muted-gray)] text-sm leading-relaxed">{desc}</p>
    </div>
  );
};

export default InfoCard;
