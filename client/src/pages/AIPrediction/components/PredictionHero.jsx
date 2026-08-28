import {
  BrainCircuit,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

/* ==========================================================
   AI PREDICTION HERO
========================================================== */

function PredictionHero({ profile, hasResult }) {
  const userName =
    profile?.fullName ||
    profile?.name ||
    "there";

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[2rem]
        bg-gradient-to-br
        from-pink-500
        via-pink-500
        to-purple-600
        px-6
        py-8
        text-white
        shadow-xl
        shadow-pink-200/60
        md:px-10
        md:py-10
      "
    >
      {/* Background decorations */}

      <div
        className="
          absolute
          -right-16
          -top-16
          h-48
          w-48
          rounded-full
          bg-white/10
          blur-2xl
        "
      />

      <div
        className="
          absolute
          -bottom-20
          left-1/3
          h-52
          w-52
          rounded-full
          bg-purple-300/20
          blur-3xl
        "
      />

      <div className="relative z-10">
        {/* Top badge */}

        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-white/20
            bg-white/15
            px-4
            py-2
            text-sm
            font-semibold
            backdrop-blur-sm
          "
        >
          <Sparkles size={16} />

          AI-Powered Health Screening
        </div>

        {/* Main content */}

        <div
          className="
            mt-7
            flex
            flex-col
            justify-between
            gap-8
            lg:flex-row
            lg:items-center
          "
        >
          <div className="max-w-3xl">
            <h1
              className="
                text-3xl
                font-black
                leading-tight
                md:text-5xl
              "
            >
              PCOD / PCOS
              <br />
              Risk Assessment
            </h1>

            <p
              className="
                mt-4
                max-w-2xl
                text-sm
                leading-7
                text-white/85
                md:text-base
              "
            >
              Hello {userName}. Answer a few questions about
              your symptoms and cycle health to receive a
              preliminary AI-based PCOD/PCOS risk assessment.
            </p>

            {/* Status */}

            <div
              className="
                mt-6
                inline-flex
                items-center
                gap-3
                rounded-2xl
                bg-white/10
                px-4
                py-3
                backdrop-blur-sm
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/15
                "
              >
                <ShieldCheck size={18} />
              </div>

              <div>
                <p className="text-xs text-white/70">
                  Assessment Status
                </p>

                <p className="text-sm font-bold">
                  {hasResult
                    ? "Assessment Complete"
                    : "Ready to Begin"}
                </p>
              </div>
            </div>
          </div>

          {/* AI Icon Card */}

          <div
            className="
              flex
              h-32
              w-32
              shrink-0
              items-center
              justify-center
              self-start
              rounded-[2rem]
              border
              border-white/20
              bg-white/15
              shadow-2xl
              backdrop-blur-md
              lg:self-center
              md:h-40
              md:w-40
            "
          >
            <BrainCircuit
              size={64}
              strokeWidth={1.5}
              className="text-white"
            />
          </div>
        </div>

        {/* Bottom note */}

        <div
          className="
            mt-8
            border-t
            border-white/15
            pt-5
          "
        >
          <p className="text-xs leading-6 text-white/70">
            This tool provides a preliminary risk screening
            based on reported symptoms and available cycle
            information. It does not diagnose PCOD or PCOS.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PredictionHero;