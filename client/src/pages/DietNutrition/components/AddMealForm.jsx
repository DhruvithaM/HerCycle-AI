import {
  Plus,
} from "lucide-react";


const initialMeal = {
  name: "",
  category: "Breakfast",
  calories: "",
  protein: "",
  carbs: "",
  fat: "",
  notes: "",
};


function AddMealForm({
  onAddMeal,
  saving,
}) {
  const [
    formData,
    setFormData,
  ] = useState(
    initialMeal
  );

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (current) => ({
        ...current,
        [name]: value,
      })
    );
  };

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      try {
        await onAddMeal(
          formData
        );

        setFormData(
          initialMeal
        );
      } catch (
        error
      ) {
        window.alert(
          error.message ||
            "Unable to add meal."
        );
      }
    };

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">

      <p className="text-sm font-semibold text-pink-500">
        Add Food
      </p>

      <h2 className="mt-1 text-xl font-bold text-slate-800">
        Log a meal
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Add what you ate and track your nutrition.
      </p>


      <form
        onSubmit={
          handleSubmit
        }
        className="mt-6 space-y-4"
      >

        <div>

          <label className="text-sm font-medium text-slate-600">
            Food or meal name
          </label>

          <input
            name="name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            placeholder="For example: Oats with banana"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-50"
          />

        </div>


        <div>

          <label className="text-sm font-medium text-slate-600">
            Meal type
          </label>

          <select
            name="category"
            value={
              formData.category
            }
            onChange={
              handleChange
            }
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-pink-400"
          >
            <option>
              Breakfast
            </option>

            <option>
              Lunch
            </option>

            <option>
              Dinner
            </option>

            <option>
              Snacks
            </option>
          </select>

        </div>


        <div className="grid grid-cols-2 gap-3">

          <div>

            <label className="text-sm font-medium text-slate-600">
              Calories
            </label>

            <input
              type="number"
              min="0"
              name="calories"
              value={
                formData.calories
              }
              onChange={
                handleChange
              }
              placeholder="250"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-pink-400"
            />

          </div>


          <div>

            <label className="text-sm font-medium text-slate-600">
              Protein (g)
            </label>

            <input
              type="number"
              min="0"
              name="protein"
              value={
                formData.protein
              }
              onChange={
                handleChange
              }
              placeholder="12"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-pink-400"
            />

          </div>

        </div>


        <div className="grid grid-cols-2 gap-3">

          <div>

            <label className="text-sm font-medium text-slate-600">
              Carbs (g)
            </label>

            <input
              type="number"
              min="0"
              name="carbs"
              value={
                formData.carbs
              }
              onChange={
                handleChange
              }
              placeholder="30"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-pink-400"
            />

          </div>


          <div>

            <label className="text-sm font-medium text-slate-600">
              Fat (g)
            </label>

            <input
              type="number"
              min="0"
              name="fat"
              value={
                formData.fat
              }
              onChange={
                handleChange
              }
              placeholder="8"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-pink-400"
            />

          </div>

        </div>


        <div>

          <label className="text-sm font-medium text-slate-600">
            Notes
          </label>

          <textarea
            name="notes"
            value={
              formData.notes
            }
            onChange={
              handleChange
            }
            placeholder="Optional notes..."
            rows="3"
            className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-pink-400"
          />

        </div>


        <button
          type="submit"
          disabled={
            saving
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-pink-100 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus size={18} />

          {saving
            ? "Saving..."
            : "Add to today's meals"}
        </button>

      </form>

    </div>
  );
}


export default AddMealForm;