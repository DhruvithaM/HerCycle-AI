import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  RotateCw,
  Clock3,
  Activity,
  ShieldPlus,
  Sparkles,
} from "lucide-react";

function MenstrualHealth({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    if (
      !formData.lastPeriodDate ||
      !formData.cycleLength
    ) {
      return;
    }

    const today = new Date();

    const lastPeriod = new Date(
      formData.lastPeriodDate
    );

    const cycleLength = Number(
      formData.cycleLength
    );

    const periodLength =
      Number(formData.periodLength) || 5;

    if (cycleLength <= 0) return;

    const diffDays = Math.floor(
      (today - lastPeriod) /
        (1000 * 60 * 60 * 24)
    );

    const cycleDay =
      ((diffDays % cycleLength) +
        cycleLength) %
        cycleLength +
      1;

    // Ovulation usually occurs around
    // 14 days before the next period.

    const ovulationDay = Math.max(
      periodLength + 1,
      cycleLength - 14
    );

    const ovulationStart =
      ovulationDay - 1;

    const ovulationEnd =
      ovulationDay + 1;

    let phase = "";

    if (cycleDay <= periodLength) {
      phase = "🌸 Menstrual Phase";
    } else if (
      cycleDay < ovulationStart
    ) {
      phase = "🌱 Follicular Phase";
    } else if (
      cycleDay >= ovulationStart &&
      cycleDay <= ovulationEnd
    ) {
      phase = "🥚 Ovulation Phase";
    } else {
      phase = "🌙 Luteal Phase";
    }

    if (phase !== formData.cyclePhase) {
      setFormData((prev) => ({
        ...prev,
        cyclePhase: phase,
      }));
    }
  }, [
    formData.lastPeriodDate,
    formData.cycleLength,
    formData.periodLength,
    formData.cyclePhase,
    setFormData,
  ]);

  const inputStyle = `
    w-full
    rounded-2xl
    border
    border-pink-100
    bg-white
    px-4
    py-3
    text-sm
    text-slate-700
    outline-none
    transition-all
    duration-300
    placeholder:text-slate-400
    focus:border-pink-500
    focus:ring-4
    focus:ring-pink-100
  `;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.25,
      }}
      className="
        mt-8
        rounded-[32px]
        border
        border-pink-100
        bg-white/80
        p-8
        backdrop-blur-xl
        shadow-[0_20px_60px_rgba(236,72,153,.08)]
      "
    >
      {/* Heading */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-slate-900">
          Menstrual Health
        </h2>

        <p className="mt-2 text-slate-500">
          HerCycle AI predicts your menstrual
          cycle automatically based on your
          cycle history.
        </p>

      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Last Period */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

            <CalendarDays
              size={16}
              className="text-pink-500"
            />

            Last Period Date

          </label>

          <input
            type="date"
            name="lastPeriodDate"
            value={formData.lastPeriodDate}
            onChange={handleChange}
            className={inputStyle}
          />

        </div>

        {/* Cycle Length */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

            <RotateCw
              size={16}
              className="text-pink-500"
            />

            Average Cycle Length

          </label>

          <input
            type="number"
            name="cycleLength"
            placeholder="28"
            value={formData.cycleLength}
            onChange={handleChange}
            className={inputStyle}
          />

        </div>

        {/* Period Length */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

            <Clock3
              size={16}
              className="text-pink-500"
            />

            Average Period Length

          </label>

          <input
            type="number"
            name="periodLength"
            placeholder="5"
            value={formData.periodLength}
            onChange={handleChange}
            className={inputStyle}
          />

        </div>

        {/* AI Prediction */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

            <Activity
              size={16}
              className="text-pink-500"
            />

            Current Cycle Phase

          </label>

          <div
            className="
              flex
              min-h-[54px]
              items-center
              justify-between
              rounded-2xl
              border
              border-pink-200
              bg-gradient-to-r
              from-pink-50
              to-purple-50
              px-5
              py-3
            "
          >

            <span className="font-semibold text-pink-600">

              {formData.cyclePhase ||
                "Waiting for information..."}

            </span>

            <Sparkles
              size={20}
              className="text-pink-500"
            />

          </div>

          <p className="mt-2 text-xs text-slate-500">
            Automatically predicted by
            HerCycle AI.
          </p>

        </div>

      </div>

      {/* PCOS */}

      <div
        className="
          mt-8
          rounded-3xl
          border
          border-pink-100
          bg-pink-50/60
          p-6
        "
      >

        <div className="flex items-center justify-between">

          <div className="flex items-start gap-4">

            <div className="rounded-2xl bg-white p-3 shadow-sm">

              <ShieldPlus
                size={22}
                className="text-pink-500"
              />

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                PCOS / PCOD
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enable this if you've been
                medically diagnosed with PCOS
                or PCOD. HerCycle AI will
                personalize insights and
                recommendations accordingly.
              </p>

            </div>

          </div>

          <label className="relative inline-flex cursor-pointer items-center">

            <input
              type="checkbox"
              name="hasPCOS"
              checked={formData.hasPCOS}
              onChange={handleChange}
              className="peer sr-only"
            />

            <div
              className="
                h-7
                w-12
                rounded-full
                bg-pink-200
                transition
                peer-checked:bg-pink-500
                after:absolute
                after:left-[4px]
                after:top-[4px]
                after:h-5
                after:w-5
                after:rounded-full
                after:bg-white
                after:transition-all
                peer-checked:after:translate-x-5
              "
            />

          </label>

        </div>

      </div>

    </motion.div>
  );
}

export default MenstrualHealth;