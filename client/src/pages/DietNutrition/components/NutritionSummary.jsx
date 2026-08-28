import {
  Beef,
  Flame,
  Salad,
  Wheat,
} from "lucide-react";


function NutritionSummary({
  calories,
  protein,
  carbs,
  fat,
}) {
  const items = [
    {
      title: "Calories",
      value: calories,
      unit: "kcal",
      icon: Flame,
      bg: "bg-orange-50",
      text: "text-orange-500",
    },
    {
      title: "Protein",
      value: protein,
      unit: "g",
      icon: Beef,
      bg: "bg-purple-50",
      text: "text-purple-500",
    },
    {
      title: "Carbohydrates",
      value: carbs,
      unit: "g",
      icon: Wheat,
      bg: "bg-blue-50",
      text: "text-blue-500",
    },
    {
      title: "Healthy Fats",
      value: fat,
      unit: "g",
      icon: Salad,
      bg: "bg-pink-50",
      text: "text-pink-500",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {items.map(
        (item) => {
          const Icon =
            item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.bg} ${item.text}`}
                >
                  <Icon size={21} />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Today
                </span>

              </div>

              <p className="mt-5 text-sm text-slate-500">
                {item.title}
              </p>

              <div className="mt-1 flex items-end gap-1">

                <p className="text-2xl font-bold text-slate-800">
                  {Math.round(
                    item.value
                  )}
                </p>

                <span className="mb-1 text-sm text-slate-400">
                  {item.unit}
                </span>

              </div>

            </div>
          );
        }
      )}

    </div>
  );
}


export default NutritionSummary;