import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  CalendarDays,
  VenusAndMars,
  Briefcase,
  Hash,
} from "lucide-react";

function PersonalInfo({ formData, setFormData }) {
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
    bg-white/90
    px-4
    py-3
    text-sm
    text-slate-700
    outline-none
    transition-all
    duration-300
    placeholder:text-slate-400
    focus:border-pink-400
    focus:ring-4
    focus:ring-pink-100
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="
        mt-12
        rounded-[32px]
        border
        border-pink-100
        bg-white/80
        p-8
        backdrop-blur-xl
        shadow-[0_20px_60px_rgba(236,72,153,.08)]
      "
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Personal Information
        </h2>

        <p className="mt-2 text-slate-500">
          Tell us about yourself.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Full Name */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <User size={16} className="text-pink-500" />
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputStyle}
          />
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Mail size={16} className="text-pink-500" />
            Email
          </label>

          <input
            type="email"
            value={formData.email}
            readOnly
            className={`${inputStyle} bg-slate-50 cursor-not-allowed`}
          />
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Phone size={16} className="text-pink-500" />
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className={inputStyle}
          />
        </div>

        {/* DOB */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <CalendarDays size={16} className="text-pink-500" />
            Date of Birth
          </label>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        {/* Gender */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <VenusAndMars size={16} className="text-pink-500" />
            Gender
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">Select Gender</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
            <option>Prefer not to say</option>
          </select>
        </div>

        {/* Occupation */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Briefcase size={16} className="text-pink-500" />
            Occupation
          </label>

          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            placeholder="Student / Engineer / Doctor..."
            className={inputStyle}
          />
        </div>

        {/* Age */}

        <div className="md:col-span-2">
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Hash size={16} className="text-pink-500" />
            Age
          </label>

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Your age"
            className={inputStyle}
          />
        </div>

      </div>
    </motion.div>
  );
}

export default PersonalInfo;