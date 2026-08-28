import {
  Pill,
} from "lucide-react";


function EmptyMedicineState() {
  return (
    <div className="rounded-3xl border border-dashed border-pink-200 bg-pink-50/30 px-6 py-14 text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-pink-500 shadow-sm">
        <Pill size={28} />
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-800">
        No medicine reminders yet
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Add your first medicine reminder and keep your daily medication schedule organized.
      </p>

    </div>
  );
}


export default EmptyMedicineState;