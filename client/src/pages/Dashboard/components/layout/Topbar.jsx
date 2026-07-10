import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Search,
  Bell,
  MessageCircle,
  Settings,
  ChevronDown,
} from "lucide-react";

import { auth } from "../../../../firebase/firebase";

function Topbar() {
  const navigate = useNavigate();

  const firebaseUser = auth.currentUser;

  const profile = useSelector(
    (state) => state.profile.profile
  );

  const displayName =
    profile?.fullName ||
    firebaseUser?.displayName ||
    "User";

  const firstName = displayName.split(" ")[0];

  const photoURL =
    profile?.photoURL ||
    firebaseUser?.photoURL ||
    "";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        sticky
        top-0
        z-30
        mb-8
        flex
        justify-end
        rounded-[28px]
        border
        border-pink-100
        bg-white/90
        px-6
        py-4
        shadow-[0_10px_35px_rgba(236,72,153,.08)]
        backdrop-blur-xl
      "
    >
      <div className="flex items-center gap-4">

        {/* Search */}

        <div
          className="
            hidden
            lg:flex
            h-12
            w-[320px]
            items-center
            rounded-2xl
            border
            border-pink-100
            bg-pink-50/40
            px-4
          "
        >
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              ml-3
              w-full
              bg-transparent
              text-sm
              outline-none
              placeholder:text-slate-400
            "
          />
        </div>

        {/* Notification */}

        <button
          className="
            relative
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-pink-100
            bg-white
            transition-all
            duration-300
            hover:bg-pink-50
          "
        >
          <Bell size={20} />

          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-pink-500
              text-[10px]
              font-bold
              text-white
            "
          >
            3
          </span>
        </button>

        {/* Messages */}

        <button
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-pink-100
            bg-white
            hover:bg-pink-50
          "
        >
          <MessageCircle size={20} />
        </button>

        {/* Settings */}

        <button
          onClick={() => navigate("/settings")}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-pink-100
            bg-white
            hover:bg-pink-50
          "
        >
          <Settings size={20} />
        </button>

        {/* Profile */}

        <button
          onClick={() => navigate("/profile-setup")}
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-pink-100
            bg-white
            px-4
            py-2
            transition-all
            duration-300
            hover:border-pink-300
            hover:bg-pink-50
            hover:shadow-lg
          "
        >
          {photoURL ? (
            <img
              src={photoURL}
              alt={displayName}
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
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

          <div className="text-left">
            <h3 className="font-semibold text-slate-800">
              {firstName}
            </h3>

            <p className="text-xs text-pink-500">
              View Profile
            </p>
          </div>

          <ChevronDown
            size={18}
            className="text-slate-500"
          />
        </button>

      </div>
    </motion.header>
  );
}

export default Topbar;