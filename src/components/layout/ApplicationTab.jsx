const ApplicationTab = ({ product }) => {
  return (
    <div className="bg-[#0f4b5a] rounded-lg border border-[#145d77] p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {product.applications.map((application, index) => (
          <div
            key={index}
            className="flex items-center p-3 bg-[#145d77] rounded-lg border border-[#1a6d8a]"
          >
            <div className="w-2 h-2 bg-[#f5ec19] rounded-full mr-3"></div>
            <span className="text-[#a9b6bd]">{application}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationTab;
