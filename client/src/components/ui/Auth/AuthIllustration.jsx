import { ShieldCheck, BrainCircuit, HeartPulse } from "lucide-react";

function AuthIllustration() {
  return (
    <div className="relative hidden h-[700px] items-center justify-center lg:flex">

      {/* Background Glow */}

      <div className="absolute h-[550px] w-[550px] rounded-full bg-pink-300/25 blur-[140px]" />

      {/* Main Circle */}

      <div className="relative flex h-[500px] w-[500px] items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 shadow-[0_40px_90px_rgba(236,72,153,.35)]">

        <img
          src="/illustrations/woman-phone.png"
          alt="HerCycle AI"
          className="h-[92%] object-contain"
        />

      </div>

      {/* Top Card */}

      <div className="absolute left-5 top-20 rounded-2xl border border-white/60 bg-white/80 px-5 py-4 backdrop-blur-xl shadow-xl">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-pink-100 p-3 text-pink-600">
            <BrainCircuit size={22} />
          </div>

          <div>

            <h4 className="font-bold text-slate-800">
              AI Prediction
            </h4>

            <p className="text-sm text-slate-500">
              95% Accurate
            </p>

          </div>

        </div>

      </div>

      {/* Right Card */}

      <div className="absolute right-0 top-60 rounded-2xl border border-white/60 bg-white/80 px-5 py-4 backdrop-blur-xl shadow-xl">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-cyan-100 p-3 text-cyan-600">
            <ShieldCheck size={22} />
          </div>

          <div>

            <h4 className="font-bold text-slate-800">
              Privacy First
            </h4>

            <p className="text-sm text-slate-500">
              Secure Records
            </p>

          </div>

        </div>

      </div>

      {/* Bottom Card */}

      <div className="absolute bottom-14 left-20 rounded-2xl border border-white/60 bg-white/80 px-5 py-4 backdrop-blur-xl shadow-xl">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-pink-100 p-3 text-pink-600">
            <HeartPulse size={22} />
          </div>

          <div>

            <h4 className="font-bold text-slate-800">
              Women's Health
            </h4>

            <p className="text-sm text-slate-500">
              Personalized Care
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthIllustration;