import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Crown,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase/firebase";
import useProfile from "../../../../hooks/useProfile";

import sidebarMenu from "../../data/sidebarMenu";
import logo from "../../../../assets/logos/hercycle-logo.png";

function Sidebar() {
  const navigate = useNavigate();

  const { profile } = useProfile();

  const displayName = profile?.fullName || "User";

  const firstName = displayName.split(" ")[0];

  const photoURL = profile?.photoURL || "";

  const handleLogout = async () => {
    try {
      await signOut(auth);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside
      className="
        sticky
        top-0
        flex
        h-screen
        w-[300px]
        flex-col
        border-r
        border-pink-100
        bg-white/95
        backdrop-blur-xl
        shadow-[0_20px_60px_rgba(236,72,153,.08)]
      "
    >
      {/* ================= Logo ================= */}

      <div className="border-b border-pink-100 px-7 py-7">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-pink-50
              to-purple-50
              shadow-inner
            "
          >
            <img
              src={logo}
              alt="HerCycle AI"
              className="h-12 w-12 object-contain"
            />
          </div>

          <div>

            <h1 className="text-2xl font-black text-slate-900">
              HerCycle AI
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Smart Women's Health
            </p>

          </div>

        </div>

      </div>

      {/* ================= Navigation ================= */}

      <nav className="flex-1 overflow-y-auto px-5 py-6">

        <div className="space-y-2">

          {sidebarMenu.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.id}
                to={item.path}
              >
                {({ isActive }) => (

                  <motion.div

                    whileHover={{ x: 6 }}

                    className={`
                      group
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      px-4
                      py-3.5
                      transition-all
                      duration-300

                      ${
                        isActive
                          ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                          : "text-slate-600 hover:bg-pink-50"
                      }
                    `}
                  >

                    <div className="flex items-center gap-4">

                      <Icon size={20} />

                      <span className="font-medium">
                        {item.title}
                      </span>

                    </div>

                    <ChevronRight
                      size={16}
                      className={`
                        transition

                        ${
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }
                      `}
                    />

                  </motion.div>

                )}
              </NavLink>

            );

          })}

        </div>

      </nav>

      {/* ================= Premium Card ================= */}

      <div className="px-5">

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="
            overflow-hidden
            rounded-3xl
            bg-gradient-to-br
            from-pink-500
            via-pink-400
            to-purple-600
            p-6
            text-white
            shadow-[0_20px_45px_rgba(236,72,153,.25)]
          "
        >

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-white/20 p-3 backdrop-blur">

              <Crown size={22} />

            </div>

            <div>

              <h3 className="text-lg font-bold">
                Premium
              </h3>

              <p className="text-sm text-pink-100">
                AI Powered Healthcare
              </p>

            </div>

          </div>

          <div className="mt-5 space-y-3">

            <div className="flex items-center gap-3">

              <ShieldCheck size={16} />

              <span className="text-sm">
                Unlimited AI Reports
              </span>

            </div>

            <div className="flex items-center gap-3">

              <ShieldCheck size={16} />

              <span className="text-sm">
                Smart Cycle Prediction
              </span>

            </div>

            <div className="flex items-center gap-3">

              <ShieldCheck size={16} />

              <span className="text-sm">
                Doctor Recommendations
              </span>

            </div>

          </div>

          <button
            className="
              mt-6
              w-full
              rounded-2xl
              bg-white
              py-3
              font-semibold
              text-pink-600
              transition
              hover:scale-[1.02]
            "
          >
            Upgrade Now
          </button>

        </motion.div>

      </div>

            {/* ================= User ================= */}

      <div className="mt-6 border-t border-pink-100 px-5 py-5">

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            bg-pink-50
            p-4
            transition-all
          "
        >

          <div className="flex items-center gap-3">

            {photoURL ? (

              <img
                src={photoURL}
                alt={displayName}
                className="
                  h-12
                  w-12
                  rounded-full
                  object-cover
                  border-2
                  border-pink-300
                "
              />

            ) : (

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-pink-500
                  to-purple-600
                  text-lg
                  font-bold
                  text-white
                "
              >
                {firstName.charAt(0).toUpperCase()}
              </div>

            )}

            <div>

              <h4 className="font-bold text-slate-800">
                {displayName}
              </h4>

              <p className="text-sm text-green-600">
                ● Online
              </p>

            </div>

          </div>

          <button
            onClick={handleLogout}
            className="
              rounded-xl
              p-2
              transition-all
              hover:bg-white
              hover:shadow-md
            "
          >
            <LogOut
              size={20}
              className="text-slate-600"
            />
          </button>

        </motion.div>

      </div>

    </aside>
  );
}

export default Sidebar;