type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-white text-black hover:scale-105"
      : "border border-white/20 hover:bg-white hover:text-black";

  return (
    <button
      className={`rounded-xl px-7 py-4 font-semibold transition duration-300 ${styles}`}
    >
      {children}
    </button>
  );
}