import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CalendarDays,
  X,
  Check,
  CircleAlert,
  ArrowRight,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import toast from "react-hot-toast";

/* ==========================================================
   DATE HELPERS
========================================================== */

function formatDateForInput(
  dateValue
) {
  if (!dateValue) return "";

  const date =
    typeof dateValue?.toDate ===
    "function"
      ? dateValue.toDate()
      : new Date(dateValue);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  const year =
    date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseInputDate(value) {
  if (!value) return null;

  const [
    year,
    month,
    day,
  ] = value
    .split("-")
    .map(Number);

  if (
    !year ||
    !month ||
    !day
  ) {
    return null;
  }

  const date = new Date(
    year,
    month - 1,
    day
  );

  date.setHours(
    0,
    0,
    0,
    0
  );

  return date;
}

function getTodayInputValue() {
  return formatDateForInput(
    new Date()
  );
}

function formatReadableDate(
  dateValue
) {
  if (!dateValue) {
    return "";
  }

  const date =
    dateValue instanceof Date
      ? dateValue
      : new Date(dateValue);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  return date.toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
}

/* ==========================================================
   COMPONENT
========================================================== */

function RecordPeriodModal({
  isOpen,
  onClose,
  latestPeriod,
  profile,
  startNewPeriod,
  finishPeriod,
}) {
  const [mode, setMode] =
    useState("start");

  const [startDate, setStartDate] =
    useState(
      getTodayInputValue()
    );

  const [endDate, setEndDate] =
    useState(
      getTodayInputValue()
    );

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  /* ========================================================
     CONFIRMATION STATE
  ======================================================== */

  const [
    showDateConfirmation,
    setShowDateConfirmation,
  ] = useState(false);

  /* ========================================================
     ACTIVE PERIOD
  ======================================================== */

  const hasActivePeriod =
    Boolean(
      latestPeriod &&
        !latestPeriod.endDate
    );

  /* ========================================================
     TODAY
  ======================================================== */

  const today = useMemo(
    () =>
      getTodayInputValue(),
    []
  );

  /* ========================================================
     PROFILE LAST PERIOD DATE
  ======================================================== */

  const profileLastPeriodDate =
    formatDateForInput(
      profile?.lastPeriodDate
    );

  /* ========================================================
     WHETHER USER CHANGED PROFILE DATE
  ======================================================== */

  const hasChangedProfileDate =
    Boolean(
      profileLastPeriodDate &&
        startDate &&
        profileLastPeriodDate !==
          startDate
    );

  /* ========================================================
     SET DEFAULT MODE
  ======================================================== */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setError("");
    setSaving(false);
    setShowDateConfirmation(
      false
    );

    if (hasActivePeriod) {
      setMode("end");

      const activeStart =
        formatDateForInput(
          latestPeriod?.startDate
        );

      setStartDate(
        activeStart || today
      );

      setEndDate(today);
    } else {
      setMode("start");

      /*
        If the profile already has a last period date,
        use it as the initial value.

        This makes Profile and Cycle Tracker feel
        consistent when the user first opens the modal.
      */

      setStartDate(
        profileLastPeriodDate ||
          today
      );

      setEndDate(today);
    }
  }, [
    isOpen,
    hasActivePeriod,
    latestPeriod,
    profileLastPeriodDate,
    today,
  ]);

  /* ========================================================
     ACTUAL SAVE OPERATION
  ======================================================== */

  const saveStartPeriod =
    async () => {
      const selectedDate =
        parseInputDate(
          startDate
        );

      if (!selectedDate) {
        setError(
          "Please select a valid period start date."
        );

        return;
      }

      const currentDate =
        parseInputDate(today);

      if (
        selectedDate >
        currentDate
      ) {
        setError(
          "Period start date cannot be in the future."
        );

        return;
      }

      setSaving(true);
      setError("");

      try {
        await startNewPeriod(
          selectedDate
        );

        toast.success(
          "Period date updated successfully."
        );

        setShowDateConfirmation(
          false
        );

        onClose();
      } catch (err) {
        console.error(
          "Error recording period:",
          err
        );

        setError(
          err?.message ||
            "Unable to record your period. Please try again."
        );

        toast.error(
          "Unable to update period."
        );
      } finally {
        setSaving(false);
      }
    };

  /* ========================================================
     START PERIOD
  ======================================================== */

  const handleStartPeriod =
    async () => {
      setError("");

      /*
        If there is an existing profile date and the
        user selected a different date, don't immediately
        save it.

        Ask for confirmation first.
      */

      if (
        hasChangedProfileDate
      ) {
        setShowDateConfirmation(
          true
        );

        return;
      }

      await saveStartPeriod();
    };

  /* ========================================================
     CONFIRM DATE CHANGE
  ======================================================== */

  const handleConfirmDateChange =
    async () => {
      await saveStartPeriod();
    };

  /* ========================================================
     CANCEL DATE CHANGE
  ======================================================== */

  const handleCancelDateChange =
    () => {
      setShowDateConfirmation(
        false
      );

      /*
        Restore the profile date so that the user
        doesn't accidentally save the changed date.
      */

      setStartDate(
        profileLastPeriodDate ||
          today
      );

      setError("");
    };

  /* ========================================================
     END PERIOD
  ======================================================== */

  const handleEndPeriod =
    async () => {
      setError("");

      if (!latestPeriod) {
        setError(
          "No active period was found."
        );

        return;
      }

      const selectedEndDate =
        parseInputDate(endDate);

      const periodStartDate =
        parseInputDate(
          formatDateForInput(
            latestPeriod.startDate
          )
        );

      if (!selectedEndDate) {
        setError(
          "Please select a valid period end date."
        );

        return;
      }

      if (
        periodStartDate &&
        selectedEndDate <
          periodStartDate
      ) {
        setError(
          "End date cannot be before the period start date."
        );

        return;
      }

      const currentDate =
        parseInputDate(today);

      if (
        selectedEndDate >
        currentDate
      ) {
        setError(
          "Period end date cannot be in the future."
        );

        return;
      }

      setSaving(true);

      try {
        await finishPeriod(
          selectedEndDate
        );

        toast.success(
          "Period completed successfully."
        );

        onClose();
      } catch (err) {
        console.error(
          "Error completing period:",
          err
        );

        setError(
          err?.message ||
            "Unable to save the period end date. Please try again."
        );

        toast.error(
          "Unable to complete period."
        );
      } finally {
        setSaving(false);
      }
    };

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ==================================================
              BACKDROP
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => {
              if (!saving) {
                onClose();
              }
            }}
            className="
              fixed
              inset-0
              z-[90]
              bg-slate-900/30
              backdrop-blur-sm
            "
          />

          {/* ==================================================
              MODAL
          ================================================== */}

          <div
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              p-4
              pointer-events-none
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                pointer-events-auto
                w-full
                max-w-[500px]
                overflow-hidden
                rounded-[30px]
                border
                border-pink-100
                bg-white
                shadow-[0_30px_80px_rgba(236,72,153,.20)]
              "
            >

              {/* ==================================================
                  HEADER
              ================================================== */}

              <div
                className="
                  relative
                  bg-gradient-to-r
                  from-pink-500
                  to-purple-500
                  px-7
                  py-6
                  text-white
                "
              >
                <button
                  type="button"
                  onClick={onClose}
                  disabled={saving}
                  className="
                    absolute
                    right-5
                    top-5
                    rounded-full
                    p-2
                    transition
                    hover:bg-white/20
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <X size={20} />
                </button>

                <div
                  className="
                    mb-4
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white/20
                    backdrop-blur-sm
                  "
                >
                  <CalendarDays size={24} />
                </div>

                <h2 className="text-2xl font-black">
                  Record Your Period
                </h2>

                <p className="mt-1 max-w-[380px] text-sm text-white/80">
                  Keep your cycle history accurate so
                  HerCycle AI can improve your predictions.
                </p>
              </div>

              {/* ==================================================
                  CONTENT
              ================================================== */}

              <div className="p-7">

                {/* ==================================================
                    START / END SWITCH
                ================================================== */}

                <div
                  className="
                    mb-7
                    grid
                    grid-cols-2
                    rounded-2xl
                    bg-pink-50
                    p-1
                  "
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (!saving) {
                        setMode("start");
                        setError("");
                        setShowDateConfirmation(
                          false
                        );
                      }
                    }}
                    disabled={saving}
                    className={`
                      rounded-xl
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      transition
                      ${
                        mode === "start"
                          ? "bg-white text-pink-600 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }
                    `}
                  >
                    Start Period
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (
                        !saving &&
                        hasActivePeriod
                      ) {
                        setMode("end");
                        setError("");
                        setShowDateConfirmation(
                          false
                        );
                      }
                    }}
                    disabled={
                      saving ||
                      !hasActivePeriod
                    }
                    className={`
                      rounded-xl
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      transition
                      ${
                        mode === "end"
                          ? "bg-white text-pink-600 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }
                      ${
                        !hasActivePeriod
                          ? "cursor-not-allowed opacity-40"
                          : ""
                      }
                    `}
                  >
                    End Period
                  </button>
                </div>

                {/* ==================================================
                    START PERIOD
                ================================================== */}

                {mode === "start" &&
                  !showDateConfirmation && (
                    <div>

                      <label
                        htmlFor="period-start-date"
                        className="
                          mb-2
                          block
                          text-sm
                          font-semibold
                          text-slate-700
                        "
                      >
                        When did your period start?
                      </label>

                      <div className="relative">

                        <CalendarDays
                          size={19}
                          className="
                            pointer-events-none
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-pink-500
                          "
                        />

                        <input
                          id="period-start-date"
                          type="date"
                          value={startDate}
                          max={today}
                          onChange={(event) => {
                            setStartDate(
                              event.target.value
                            );

                            setError("");
                          }}
                          disabled={saving}
                          className="
                            w-full
                            rounded-2xl
                            border
                            border-pink-100
                            bg-white
                            py-3.5
                            pl-12
                            pr-4
                            text-sm
                            font-medium
                            text-slate-700
                            outline-none
                            transition
                            focus:border-pink-400
                            focus:ring-4
                            focus:ring-pink-100
                            disabled:cursor-not-allowed
                            disabled:bg-slate-50
                          "
                        />

                      </div>

                      <p className="mt-3 text-xs text-slate-400">
                        Choose the actual day your period
                        started.
                      </p>

                      {/* -------------------------------------------
                          PROFILE DATE INFO
                      ------------------------------------------- */}

                      {profileLastPeriodDate && (
                        <div
                          className="
                            mt-5
                            rounded-2xl
                            border
                            border-pink-100
                            bg-pink-50
                            p-4
                          "
                        >
                          <p className="text-xs font-semibold uppercase tracking-wide text-pink-500">
                            Current profile date
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-800">
                            {formatReadableDate(
                              profile?.lastPeriodDate
                            )}
                          </p>
                        </div>
                      )}

                    </div>
                  )}

                {/* ==================================================
                    DATE CHANGE CONFIRMATION
                ================================================== */}

                {mode === "start" &&
                  showDateConfirmation && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="rounded-[24px] border border-pink-100 bg-pink-50 p-6"
                    >

                      <div
                        className="
                          mx-auto
                          mb-5
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-full
                          bg-white
                          text-pink-500
                          shadow-sm
                        "
                      >
                        <CalendarDays
                          size={26}
                        />
                      </div>

                      <h3
                        className="
                          text-center
                          text-xl
                          font-black
                          text-slate-900
                        "
                      >
                        Update your period date?
                      </h3>

                      <p
                        className="
                          mt-3
                          text-center
                          text-sm
                          leading-6
                          text-slate-500
                        "
                      >
                        Your profile currently shows
                        <span className="font-bold text-slate-700">
                          {" "}
                          {formatReadableDate(
                            profile?.lastPeriodDate
                          )}
                        </span>{" "}
                        as your last period.
                      </p>

                      <div
                        className="
                          my-5
                          flex
                          items-center
                          justify-center
                          gap-3
                        "
                      >

                        <div
                          className="
                            rounded-xl
                            bg-white
                            px-4
                            py-3
                            text-center
                            shadow-sm
                          "
                        >
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                            Current
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-700">
                            {formatReadableDate(
                              profile?.lastPeriodDate
                            )}
                          </p>
                        </div>

                        <ArrowRight
                          size={18}
                          className="shrink-0 text-pink-400"
                        />

                        <div
                          className="
                            rounded-xl
                            bg-white
                            px-4
                            py-3
                            text-center
                            shadow-sm
                          "
                        >
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-pink-400">
                            New
                          </p>

                          <p className="mt-1 text-sm font-bold text-pink-600">
                            {formatReadableDate(
                              startDate
                            )}
                          </p>
                        </div>

                      </div>

                      <p
                        className="
                          text-center
                          text-xs
                          leading-5
                          text-slate-400
                        "
                      >
                        If you continue, your profile and
                        cycle tracker will use the new date.
                      </p>

                      <div
                        className="
                          mt-6
                          flex
                          gap-3
                        "
                      >

                        <button
                          type="button"
                          onClick={
                            handleCancelDateChange
                          }
                          disabled={saving}
                          className="
                            flex-1
                            rounded-2xl
                            border
                            border-pink-100
                            bg-white
                            px-5
                            py-3.5
                            text-sm
                            font-semibold
                            text-slate-600
                            transition
                            hover:bg-white
                            disabled:opacity-50
                          "
                        >
                          No, Keep It
                        </button>

                        <button
                          type="button"
                          onClick={
                            handleConfirmDateChange
                          }
                          disabled={saving}
                          className="
                            flex-1
                            rounded-2xl
                            bg-gradient-to-r
                            from-pink-500
                            to-purple-500
                            px-5
                            py-3.5
                            text-sm
                            font-bold
                            text-white
                            shadow-lg
                            shadow-pink-200
                            transition
                            hover:-translate-y-0.5
                            hover:shadow-xl
                            disabled:opacity-60
                          "
                        >
                          {saving
                            ? "Updating..."
                            : "Yes, Update"}
                        </button>

                      </div>

                    </motion.div>
                  )}

                {/* ==================================================
                    END PERIOD
                ================================================== */}

                {mode === "end" && (
                  <div>

                    <div
                      className="
                        mb-5
                        rounded-2xl
                        bg-pink-50
                        p-4
                      "
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-pink-500">
                        Current Period
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-800">
                        Started{" "}
                        {formatReadableDate(
                          latestPeriod?.startDate
                        )}
                      </p>
                    </div>

                    <label
                      htmlFor="period-end-date"
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-slate-700
                      "
                    >
                      When did your period end?
                    </label>

                    <div className="relative">

                      <CalendarDays
                        size={19}
                        className="
                          pointer-events-none
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-pink-500
                        "
                      />

                      <input
                        id="period-end-date"
                        type="date"
                        value={endDate}
                        min={formatDateForInput(
                          latestPeriod?.startDate
                        )}
                        max={today}
                        onChange={(event) => {
                          setEndDate(
                            event.target.value
                          );

                          setError("");
                        }}
                        disabled={saving}
                        className="
                          w-full
                          rounded-2xl
                          border
                          border-pink-100
                          bg-white
                          py-3.5
                          pl-12
                          pr-4
                          text-sm
                          font-medium
                          text-slate-700
                          outline-none
                          transition
                          focus:border-pink-400
                          focus:ring-4
                          focus:ring-pink-100
                          disabled:cursor-not-allowed
                          disabled:bg-slate-50
                        "
                      />

                    </div>

                    <p className="mt-3 text-xs text-slate-400">
                      Adding the end date helps HerCycle AI
                      estimate your typical period length.
                    </p>

                  </div>
                )}

                {/* ==================================================
                    ERROR
                ================================================== */}

                {error && (
                  <div
                    className="
                      mt-5
                      flex
                      items-start
                      gap-3
                      rounded-2xl
                      border
                      border-red-100
                      bg-red-50
                      p-4
                      text-sm
                      text-red-600
                    "
                  >
                    <CircleAlert
                      size={18}
                      className="mt-0.5 shrink-0"
                    />

                    <p>{error}</p>
                  </div>
                )}

                {/* ==================================================
                    ACTION BUTTONS
                ================================================== */}

                {!showDateConfirmation && (
                  <div
                    className="
                      mt-7
                      flex
                      gap-3
                    "
                  >

                    <button
                      type="button"
                      onClick={onClose}
                      disabled={saving}
                      className="
                        flex-1
                        rounded-2xl
                        border
                        border-pink-100
                        bg-white
                        px-5
                        py-3.5
                        text-sm
                        font-semibold
                        text-slate-600
                        transition
                        hover:bg-pink-50
                        disabled:opacity-50
                      "
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={
                        mode === "start"
                          ? handleStartPeriod
                          : handleEndPeriod
                      }
                      disabled={saving}
                      className="
                        flex
                        flex-1
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-gradient-to-r
                        from-pink-500
                        to-purple-500
                        px-5
                        py-3.5
                        text-sm
                        font-bold
                        text-white
                        shadow-lg
                        shadow-pink-200
                        transition
                        hover:-translate-y-0.5
                        hover:shadow-xl
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      {saving ? (
                        <>
                          <span
                            className="
                              h-4
                              w-4
                              animate-spin
                              rounded-full
                              border-2
                              border-white/30
                              border-t-white
                            "
                          />

                          Saving...
                        </>
                      ) : (
                        <>
                          <Check size={18} />

                          {mode === "start"
                            ? "Record Period"
                            : "Save End Date"}
                        </>
                      )}
                    </button>

                  </div>
                )}

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default RecordPeriodModal;