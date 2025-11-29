const Button = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className="flex items-center justify-center py-2 cursor-pointer text-sm font-semibold border border-[var(--accent-yellow)] bg-[var(--accent-yellow)]/10 hover:bg-[var(--accent-yellow)]/30 text-[var(--accent-yellow)] transition-all">
      {children}
    </div>
  );
};

export default Button;
