import {
  ClipboardList,
} from "lucide-react";

import MedicineCard from "./MedicineCard";
import EmptyMedicineState from "./EmptyMedicineState";


function MedicineList({
  medicines,
  onDelete,
  onToggleStatus,
}) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-semibold text-pink-500">
            My Medicines
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-800">
            Medicine reminders
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your current medicine schedule.
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-500">
          <ClipboardList size={20} />
        </div>

      </div>


      <div className="mt-6">

        {medicines.length === 0 ? (

          <EmptyMedicineState />

        ) : (

          <div className="grid gap-4 xl:grid-cols-2">

            {medicines.map(
              (medicine) => (
                <MedicineCard
                  key={medicine.id}
                  medicine={medicine}
                  onDelete={onDelete}
                  onToggleStatus={
                    onToggleStatus
                  }
                />
              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}


export default MedicineList;