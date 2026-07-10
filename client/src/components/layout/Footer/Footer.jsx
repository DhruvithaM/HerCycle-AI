import {
  Heart,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

import {
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-pink-500/10 blur-[150px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-purple-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        {/* Newsletter */}
        <div className="mb-20 rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-4xl font-black">
                Stay Updated
              </h2>

              <p className="mt-3 max-w-md text-slate-300">
                Subscribe to receive AI-powered health insights,
                wellness tips and product updates.
              </p>
            </div>

            <div className="flex w-full max-w-xl flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-white/10 bg-white/10 px-6 py-4 text-white placeholder:text-slate-400 outline-none focus:border-pink-500"
              />

              <button className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 font-semibold transition duration-300 hover:scale-105">
                Subscribe
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Grid */}

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div>
            <h2 className="text-3xl font-black text-pink-400">
              HerCycle AI
            </h2>

            <p className="mt-6 leading-8 text-slate-300">
              Empowering women through AI-powered healthcare,
              menstrual cycle tracking,
              PCOD prediction and personalized wellness.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="mb-6 text-xl font-bold">
              Quick Links
            </h3>

            <ul className="space-y-4 text-slate-300">

              <li className="cursor-pointer transition hover:text-pink-400">
                Home
              </li>

              <li className="cursor-pointer transition hover:text-pink-400">
                Features
              </li>

              <li className="cursor-pointer transition hover:text-pink-400">
                Prediction
              </li>

              <li className="cursor-pointer transition hover:text-pink-400">
                Community
              </li>

              <li className="cursor-pointer transition hover:text-pink-400">
                About
              </li>

            </ul>
          </div>

          {/* Features */}

          <div>
            <h3 className="mb-6 text-xl font-bold">
              Features
            </h3>

            <ul className="space-y-4 text-slate-300">

              <li>AI Prediction</li>

              <li>Cycle Tracker</li>

              <li>Dashboard</li>

              <li>Medicine Reminder</li>

              <li>Diet Planner</li>

            </ul>
          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-6 text-xl font-bold">
              Contact
            </h3>

            <div className="space-y-5 text-slate-300">

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>support@hercycleai.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>Bengaluru, Karnataka</span>
              </div>

            </div>

            {/* Social Icons */}

            <div className="mt-8 flex gap-4">

              <a
                href="#"
                className="rounded-full bg-white/10 p-3 transition duration-300 hover:bg-pink-500"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-white/10 p-3 transition duration-300 hover:bg-pink-500"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-white/10 p-3 transition duration-300 hover:bg-pink-500"
              >
                <FaGithub size={18} />
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-20 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-slate-400 lg:flex-row">

          <p>
            © 2026 HerCycle AI. All Rights Reserved.
          </p>

          <div className="flex items-center gap-2">

            Made with

            <Heart
              size={18}
              className="fill-pink-500 text-pink-500"
            />

            for Women's Health

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;