import { ShieldCheck, Phone } from "lucide-react";

const ProductModal = ({ setShowModal, selectedProduct }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      {/* Modal box */}
      <div
        id="product-modal"
        className="relative p-8 border border-[var(--accent-yellow)]/20 space-y-6 w-full max-w-2xl bg-[linear-gradient(to_right,_#0c2430,_#145d77_50%,_#0c2430)]"
      >
        <img
          className="object-cover w-full h-70"
          src="/images/abt4.jpg"
          alt=""
        />

        <div className="space-y-2">
          <h2 className="text-3xl text-[var(--accent-yellow)] font-bold">
            {selectedProduct.name}
          </h2>
          <div className="text-lg text-[var(--accent-yellow)] font-semibold">
            {selectedProduct.specs}
          </div>
        </div>

        <p className="text-[var(--muted-gray)]">
          {selectedProduct.description}
        </p>

        <div className="space-y-2">
          <h4 className="font-bold text-xl">Key Features:</h4>

          <ul className="space-y-2 text-[var(--muted-gray)]">
            <li className="flex items-center gap-2">
              <ShieldCheck className="inline !text-[var(--accent-yellow)] size-5" />
              {selectedProduct.features[0]}
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="inline !text-[var(--accent-yellow)] size-5" />
              {selectedProduct.features[1]}
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="inline !text-[var(--accent-yellow)] size-5" />
              {selectedProduct.features[2]}
            </li>
          </ul>
        </div>

        <div className="flex justify-end items-center gap-3">
          <div
            onClick={() => setShowModal(false)}
            className="py-2 px-4 cursor-pointer font-semibold border-2 border-[var(--accent-yellow)]/60 hover:bg-[var(--accent-yellow)]/20 text-[var(--accent-yellow)] text-sm transition-all"
          >
            Close
          </div>
          <a href="tel:09157495102">
            <div className="flex items-center gap-2 shadow-[-5px_8px_10px_0px_var(--accent-yellow)]/30 hover:shadow-[-5px_10px_25px_0px_var(--accent-yellow)]/60 transition-all hover:scale-105 py-2 px-4 cursor-pointer bg-[var(--accent-yellow)] text-[var(--bg-dark)] font-semibold text-sm border-2 border-[var(--accent-yellow)]">
              <Phone className="inline size-4" /> Inquire Now
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
