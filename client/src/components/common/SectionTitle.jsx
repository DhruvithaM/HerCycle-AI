function SectionTitle({
  title,
  subtitle = "",
  className = "",
}) {
  return (
    <div className={`mb-6 ${className}`}>

      <h2
        className="
          text-xl
          font-bold
          text-slate-900
          sm:text-2xl
        "
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="
            mt-1
            text-sm
            text-slate-500
            sm:text-base
          "
        >
          {subtitle}
        </p>
      )}

    </div>
  );
}

export default SectionTitle;