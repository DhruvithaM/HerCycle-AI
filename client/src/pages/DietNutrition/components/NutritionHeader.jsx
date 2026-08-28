import {
  Apple,
  Sparkles,
} from "lucide-react";


function NutritionHeader() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 p-6 text-white shadow-lg sm:p-8">

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

        <div>
          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Apple size={25} />
            </div>

            <div>
              <p className="text-sm font-medium text-pink-100">
                Healthy Lifestyle
              </p>

              <h1 className="text-2xl font-bold sm:text-3xl">
                Diet & Nutrition
              </h1>
            </div>

          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-pink-50 sm:text-base">
            Track your daily meals, nutrition, calories and hydration
            to build healthier habits every day.
          </p>
        </div>


        <div className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3 backdrop-blur-sm">

          <Sparkles
            size={20}
          />

          <div>
            <p className="text-xs text-pink-100">
              Daily goal
            </p>

            <p className="font-bold">
              Eat healthy, feel better
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}


export default NutritionHeader;