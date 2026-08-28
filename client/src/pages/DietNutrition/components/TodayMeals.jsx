
import {
  Trash2,
  Utensils,
} from "lucide-react";


function TodayMeals({
  meals,
  onDelete,
}) {
  const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
  ];

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-semibold text-pink-500">
            Today's Food
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-800">
            Today's meals
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review everything you have logged today.
          </p>
        </div>


        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
          <Utensils size={20} />
        </div>

      </div>


      <div className="mt-6 space-y-6">

        {categories.map(
          (category) => {
            const categoryMeals =
              meals.filter(
                (meal) =>
                  meal.category ===
                  category
              );

            return (
              <div
                key={category}
              >
                <div className="mb-3 flex items-center justify-between">

                  <h3 className="font-semibold text-slate-700">
                    {category}
                  </h3>

                  <span className="text-xs text-slate-400">
                    {
                      categoryMeals.length
                    } item(s)
                  </span>

                </div>


                {categoryMeals.length ===
                0 ? (
                  <div className="rounded-xl border border-dashed border-slate-200 px-4 py-4 text-sm text-slate-400">
                    Nothing logged yet.
                  </div>
                ) : (
                  <div className="space-y-3">

                    {categoryMeals.map(
                      (meal) => (
                        <div
                          key={
                            meal.id
                          }
                          className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                        >

                          <div className="min-w-0">

                            <h4 className="truncate font-semibold text-slate-800">
                              {
                                meal.name
                              }
                            </h4>

                            <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">

                              <span>
                                {
                                  meal.calories
                                } kcal
                              </span>

                              <span>
                                P: {
                                  meal.protein ||
                                  0
                                }g
                              </span>

                              <span>
                                C: {
                                  meal.carbs ||
                                  0
                                }g
                              </span>

                              <span>
                                F: {
                                  meal.fat ||
                                  0
                                }g
                              </span>

                            </div>

                          </div>


                          <button
                            type="button"
                            onClick={() =>
                              onDelete(
                                meal.id
                              )
                            }
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100"
                            title="Delete meal"
                          >
                            <Trash2
                              size={17}
                            />
                          </button>

                        </div>
                      )
                    )}

                  </div>
                )}

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}


export default TodayMeals;