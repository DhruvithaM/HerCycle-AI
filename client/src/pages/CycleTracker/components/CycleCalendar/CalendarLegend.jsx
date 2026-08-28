function CalendarLegend() {
  const legends = [
    {
      label: "Recorded Period",
      element: (
        <span className="h-3 w-3 rounded-full bg-pink-500" />
      ),
    },
    {
      label: "Predicted Period",
      element: (
        <span className="h-3 w-3 rounded-full border-2 border-pink-500 bg-white" />
      ),
    },
    {
      label: "Fertility Window",
      element: (
        <span className="h-3 w-3 rounded-full bg-green-400" />
      ),
    },
    {
      label: "Ovulation",
      element: (
        <span className="h-3 w-3 rounded-full bg-purple-500" />
      ),
    },
    {
      label: "Today",
      element: (
        <span className="h-3 w-3 rounded-full border-2 border-blue-500 bg-white" />
      ),
    },
  ];

  return (
    <div
      className="
        border-t
        border-pink-100
        pt-6
      "
    >
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Calendar Legend
      </h3>

      <div className="flex flex-wrap gap-x-8 gap-y-4">
        {legends.map((legend) => (
          <div
            key={legend.label}
            className="flex items-center gap-2"
          >
            {legend.element}

            <span className="text-sm text-slate-600">
              {legend.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarLegend;