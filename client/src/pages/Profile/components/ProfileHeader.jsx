import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import logo from "../../../assets/logos/hercycle-logo.png";

function ProfileHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative"
    >
      {/* Logo */}

      <div className="flex justify-center">
        <img
          src={logo}
          alt="HerCycle AI"
          className="h-16 w-auto object-contain"
        />
      </div>

      {/* Privacy Badge */}

      <div className="mt-6 flex justify-center">
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-pink-100
            bg-pink-50
            px-5
            py-2
          "
        >
          <ShieldCheck
            size={18}
            className="text-pink-500"
          />

          <span className="text-sm font-semibold text-pink-600">
            Your data is 100% secure
          </span>
        </div>
      </div>

      {/* Heading */}

      <div className="mt-8 text-center">

        <h1
          className="
            text-4xl
            font-black
            tracking-tight
            text-slate-900

            lg:text-5xl
          "
        >
          Complete Your Profile
        </h1>

        <p
          className="
            mx-auto
            mt-4
            max-w-2xl
            text-base
            leading-7
            text-slate-500
          "
        >
          Help us personalize your health journey by completing your
          profile. This information enables HerCycle AI to provide
          accurate cycle predictions, wellness insights and AI-powered
          recommendations tailored just for you.
        </p>

      </div>

      {/* Progress */}

      <div className="mt-10 flex justify-center">

        <div className="flex items-center">

          {/* Step 1 */}

          <div className="flex flex-col items-center">

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
                from-pink-500
                to-purple-600
                text-lg
                font-bold
                text-white
                shadow-lg
              "
            >
              1
            </div>

            <span className="mt-3 text-sm font-semibold text-pink-600">
              Profile
            </span>

          </div>

          {/* Line */}

          <div
            className="
              mx-5
              h-1
              w-28
              rounded-full
              bg-gradient-to-r
              from-pink-400
              to-purple-500
            "
          />

          {/* Step 2 */}

          <div className="flex flex-col items-center">

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border-2
                border-pink-200
                bg-white
                text-lg
                font-bold
                text-pink-400
              "
            >
              2
            </div>

            <span className="mt-3 text-sm font-medium text-slate-400">
              Dashboard
            </span>

          </div>

        </div>

      </div>

      {/* Decorative Glow */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-10 top-16 h-3 w-3 rounded-full bg-pink-300" />

        <div className="absolute right-10 top-10 h-2 w-2 rounded-full bg-purple-300" />

        <div className="absolute left-1/4 top-40 h-2 w-2 rounded-full bg-pink-400" />

        <div className="absolute right-1/4 top-52 h-3 w-3 rounded-full bg-pink-200" />

      </div>
    </motion.div>
  );
}

export default ProfileHeader;