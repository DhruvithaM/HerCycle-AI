import { motion } from "framer-motion";
import {
  Ruler,
  Weight,
  Droplets,
  PhoneCall,
  Activity,
} from "lucide-react";
import { useEffect } from "react";

function HealthInfo({ formData, setFormData }) {
  useEffect(() => {
    const height = parseFloat(formData.height);
    const weight = parseFloat(formData.weight);

    if (height > 0 && weight > 0) {
      const bmi = (
        weight /
        Math.pow(height / 100, 2)
      ).toFixed(1);

      setFormData((prev) => ({
        ...prev,
        bmi,
      }));
    }
  }, [formData.height, formData.weight]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="
        mt-8
        rounded-[32px]
        border
        border-pink-100
        bg-white/80
        p-8
        shadow-[0_20px_60px_rgba(236,72,153,.08)]
        backdrop-blur-xl
      "
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Health Information
        </h2>

        <p className="mt-2 text-slate-500">
          These details help us calculate personalized health insights.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Height */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Ruler
              size={16}
              className="text-pink-500"
            />
            Height (cm)
          </label>

          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="165"
            className={inputStyle}
          />
        </div>

        {/* Weight */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Weight
              size={16}
              className="text-pink-500"
            />
            Weight (kg)
          </label>

          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="60"
            className={inputStyle}
          />
        </div>

        {/* Blood Group */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Droplets
              size={16}
              className="text-pink-500"
            />
            Blood Group
          </label>

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
        </div>

        {/* Emergency Contact */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <PhoneCall
              size={16}
              className="text-pink-500"
            />
            Emergency Contact
          </label>

          <input
            type="tel"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className={inputStyle}
          />
        </div>

      </div>

      {/* BMI */}

      <div className="mt-8 rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white">

        <div className="flex items-center gap-3">

          <Activity size={26} />

          <div>

            <p className="text-sm opacity-90">
              Your Current BMI
            </p>

            <h3 className="mt-1 text-3xl font-bold">
              {formData.bmi || "--"}
            </h3>

          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default HealthInfo;