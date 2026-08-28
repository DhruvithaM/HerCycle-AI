import {
  Minus,
  Plus,
  Droplets,
} from "lucide-react";


function WaterTracker({
  water,
  setWater,
}) {
  const percentage =
    Math.min(
      (water / 8) * 100,
      100
    );

  const increaseWater = () => {
    setWater(
      (current) =>
        Math.min(
          current + 1,
          12
        )
    );
  };

  const decreaseWater = () => {
    setWater(
      (current) =>
        Math.max(
          current - 1,
          0
        )
    );
  };

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-semibold text-pink-500">
            Hydration
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-800">
            Water tracker
          </h2>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
          <Droplets size={21} />
        </div>

      </div>


      <div className="mt-6">

        <div className="flex items-end justify-between">

          <div>
            <span className="text-4xl font-bold text-slate-800">
              {water}
            </span>

            <span className="ml-2 text-sm text-slate-400">
              / 8 glasses
            </span>
          </div>

          <p className="text-sm font-medium text-blue-500">
            {Math.round(
              percentage
            )}% complete
          </p>

        </div>


        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">

          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300"
            style={{
              width:
                `${percentage}%`,
            }}
          />

        </div>


        <div className="mt-6 flex gap-3">

          <button
            type="button"
            onClick={
              decreaseWater
            }
            className="flex h-11 flex-1 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          >
            <Minus size={19} />
          </button>


          <button
            type="button"
            onClick={
              increaseWater
            }
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            <Plus size={18} />

            Add a glass
          </button>

        </div>

      </div>

    </div>
  );
}


export default WaterTracker;