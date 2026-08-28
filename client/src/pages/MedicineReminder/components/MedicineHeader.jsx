import {
  BellRing,
  CalendarCheck,
  Pill,
} from "lucide-react";


function MedicineHeader({
  totalMedicines,
  takenCount,
}) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 p-6 text-white shadow-lg">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Pill size={24} />
            </div>

            <div>
              <p className="text-sm font-medium text-pink-100">
                Medicine Reminder
              </p>

              <h1 className="text-2xl font-bold">
                Stay on track with your medicines
              </h1>
            </div>

          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-pink-100">
            Add your medicines and keep track of your
            daily schedule in one place.
          </p>
        </div>


        <div className="grid grid-cols-2 gap-3">

          <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur-sm">

            <div className="flex items-center gap-2 text-pink-100">
              <BellRing size={16} />
              <span className="text-xs">
                Active medicines
              </span>
            </div>

            <p className="mt-2 text-2xl font-bold">
              {totalMedicines}
            </p>

          </div>


          <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur-sm">

            <div className="flex items-center gap-2 text-pink-100">
              <CalendarCheck size={16} />
              <span className="text-xs">
                Taken today
              </span>
            </div>

            <p className="mt-2 text-2xl font-bold">
              {takenCount}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


export default MedicineHeader;