import {
  useMemo,
  useState,
} from "react";

import MedicineHeader from "./components/MedicineHeader";
import AddMedicineForm from "./components/AddMedicineForm";
import TodayMedicines from "./components/TodayMedicines";
import MedicineList from "./components/MedicineList";

import useMedicines from "../../hooks/useMedicines";


/* ==========================================================
   GET TODAY DATE
========================================================== */

const getTodayDate = () => {
  return new Date()
    .toISOString()
    .split("T")[0];
};


/* ==========================================================
   INITIAL FORM DATA
========================================================== */

const createInitialForm = () => ({
  name: "",
  dosage: "",
  frequency: "daily",
  days: [],
  times: [""],
  startDate: getTodayDate(),
  endDate: "",
  notes: "",
});


/* ==========================================================
   MEDICINE REMINDER PAGE
========================================================== */

function MedicineReminder() {
  /* ========================================================
     MEDICINE HOOK
  ======================================================== */

  const {
    medicines,
    loading,
    saving,
    error,
    addMedicine,
    markAsTaken,
    toggleStatus,
    removeMedicine,
  } = useMedicines();


  /* ========================================================
     FORM STATE
  ======================================================== */

  const [
    formData,
    setFormData,
  ] = useState(
    createInitialForm()
  );


  /* ========================================================
     PREPARE MEDICINES FOR TODAY
  ======================================================== */

  const displayMedicines = useMemo(() => {
    const today = getTodayDate();

    return medicines.map(
      (medicine) => ({
        ...medicine,

        takenToday:
          medicine.lastTakenDate === today,
      })
    );
  }, [medicines]);


  /* ========================================================
     ACTIVE MEDICINES
  ======================================================== */

  const activeMedicines =
    displayMedicines.filter(
      (medicine) => medicine.active
    );


  /* ========================================================
     TAKEN COUNT
  ======================================================== */

  const takenCount =
    activeMedicines.filter(
      (medicine) => medicine.takenToday
    ).length;


  /* ========================================================
     ADD MEDICINE
  ======================================================== */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    try {
      await addMedicine({
        ...formData,

        times:
          formData.times.filter(
            (time) => time?.trim()
          ),
      });

      setFormData(
        createInitialForm()
      );
    } catch (submitError) {
      window.alert(
        submitError.message ||
          "Unable to add medicine."
      );
    }
  };


  /* ========================================================
     MARK MEDICINE AS TAKEN
  ======================================================== */

  const handleMarkTaken = async (
    medicineId
  ) => {
    try {
      await markAsTaken(
        medicineId
      );
    } catch (medicineError) {
      window.alert(
        medicineError.message ||
          "Unable to mark medicine as taken."
      );
    }
  };


  /* ========================================================
     DELETE MEDICINE
  ======================================================== */

  const handleDelete = async (
    medicineId
  ) => {
    try {
      await removeMedicine(
        medicineId
      );
    } catch (medicineError) {
      window.alert(
        medicineError.message ||
          "Unable to delete medicine."
      );
    }
  };


  /* ========================================================
     TOGGLE MEDICINE STATUS
  ======================================================== */

  const handleToggleStatus = async (
    medicineId,
    active
  ) => {
    try {
      await toggleStatus(
        medicineId,
        active
      );
    } catch (medicineError) {
      window.alert(
        medicineError.message ||
          "Unable to update medicine."
      );
    }
  };


  /* ========================================================
     LOADING
  ======================================================== */

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">

          <div
            className="
              mx-auto
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-pink-100
              border-t-pink-500
            "
          />

          <p className="mt-4 text-sm text-slate-500">
            Loading your medicines...
          </p>

        </div>
      </div>
    );
  }


  /* ========================================================
     PAGE CONTENT
  ======================================================== */

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[1600px]
        space-y-6
        pb-10
      "
    >

      {/* ================================================
          HEADER
      ================================================= */}

      <MedicineHeader
        totalMedicines={
          activeMedicines.length
        }
        takenCount={
          takenCount
        }
      />


      {/* ================================================
          ERROR
      ================================================= */}

      {error && (
        <div
          className="
            rounded-2xl
            border
            border-red-100
            bg-red-50
            px-5
            py-4
            text-sm
            text-red-600
          "
        >
          {error}
        </div>
      )}


      {/* ================================================
          TODAY + ADD MEDICINE
      ================================================= */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-[minmax(0,1fr)_minmax(360px,430px)]
        "
      >

        <TodayMedicines
          medicines={
            displayMedicines
          }
          onMarkTaken={
            handleMarkTaken
          }
        />


        <AddMedicineForm
          formData={
            formData
          }
          setFormData={
            setFormData
          }
          onSubmit={
            handleSubmit
          }
          saving={
            saving
          }
        />

      </div>


      {/* ================================================
          ALL MEDICINES
      ================================================= */}

      <MedicineList
        medicines={
          displayMedicines
        }
        onDelete={
          handleDelete
        }
        onToggleStatus={
          handleToggleStatus
        }
      />

    </div>
  );
}

export default MedicineReminder;