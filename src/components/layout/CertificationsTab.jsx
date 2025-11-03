const CertificationsTab = ({ product }) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#0f4b5a] p-6 rounded-lg border border-[#145d77]">
        <h4 className="font-semibold text-white mb-3">Engine Certifications</h4>
        <p className="text-[#a9b6bd]">{product.certifications.engine}</p>
      </div>
      <div className="bg-[#0f4b5a] p-6 rounded-lg border border-[#145d77]">
        <h4 className="font-semibold text-white mb-3">
          Alternator Certifications
        </h4>
        <p className="text-[#a9b6bd]">{product.certifications.alternator}</p>
      </div>
    </div>
  );
};

export default CertificationsTab;
