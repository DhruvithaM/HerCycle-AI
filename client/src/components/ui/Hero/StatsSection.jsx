function StatsSection() {
  return (
    <div className="mt-16 grid grid-cols-3 gap-10 border-t border-pink-200 pt-10">

      <div>

        <p className="text-sm font-medium uppercase tracking-wider text-pink-500">
          Prediction Accuracy
        </p>

        <h2 className="mt-3 text-5xl font-black text-slate-900">
          95%
        </h2>

      </div>

      <div>

        <p className="text-sm font-medium uppercase tracking-wider text-pink-500">
          Women Supported
        </p>

        <h2 className="mt-3 text-5xl font-black text-slate-900">
          50K+
        </h2>

      </div>

      <div>

        <p className="text-sm font-medium uppercase tracking-wider text-pink-500">
          AI Assistance
        </p>

        <h2 className="mt-3 text-5xl font-black text-slate-900">
          24/7
        </h2>

      </div>

    </div>
  );
}

export default StatsSection;