import { Loader2 } from "lucide-react";

function Button({
  children,
  onClick,
  type = "button",
  loading = false,
  disabled = false,
  fullWidth = true,
  icon: Icon,
  variant = "primary",
  className = "",
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-xl hover:shadow-pink-200",

    secondary:
      "border border-pink-200 bg-white text-pink-600 hover:bg-pink-50",

    danger:
      "bg-red-500 text-white hover:bg-red-600",

    success:
      "bg-green-500 text-white hover:bg-green-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        flex
        h-14
        ${fullWidth ? "w-full" : "w-auto"}
        items-center
        justify-center
        gap-2
        rounded-2xl
        px-6
        font-semibold
        transition-all
        duration-300
        hover:scale-[1.02]
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${variants[variant]}
        ${className}
      `}
    >
      {loading ? (
        <>
          <Loader2
            size={18}
            className="animate-spin"
          />

          Loading...
        </>
      ) : (
        <>
          {children}

          {Icon && <Icon size={18} />}
        </>
      )}
    </button>
  );
}

export default Button;
