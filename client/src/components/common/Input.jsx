import { Eye, EyeOff } from "lucide-react";

function Input({
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error = "",
  showPassword = false,
  togglePassword,
  className = "",
}) {
  return (
    <div className={`w-full ${className}`}>
      {/* Label */}

      {label && (
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
          {required && <span className="text-pink-500"> *</span>}
        </label>
      )}

      {/* Input Box */}

      <div
        className="
          flex
          h-14
          w-full
          items-center
          rounded-2xl
          border
          border-pink-200
          bg-white
          px-4
          transition-all
          duration-300
          focus-within:border-pink-500
          focus-within:ring-4
          focus-within:ring-pink-100
        "
      >
        {/* Left Icon */}

        {Icon && (
          <Icon
            size={20}
            className="mr-3 flex-shrink-0 text-pink-500"
          />
        )}

        {/* Input */}

        <input
          type={
            togglePassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="
            w-full
            bg-transparent
            text-slate-800
            placeholder:text-slate-400
            outline-none
          "
        />

        {/* Password Toggle */}

        {togglePassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="ml-2 text-slate-400 transition hover:text-pink-500"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}
      </div>

      {/* Error */}

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;