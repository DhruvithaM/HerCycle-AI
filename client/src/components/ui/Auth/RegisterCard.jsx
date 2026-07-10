import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

import {
  signInWithGoogle,
  registerUser,
} from "../../../services/authService";

function RegisterCard() {
  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password Visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Loading
  const [loading, setLoading] = useState(false);

  // ================= GOOGLE REGISTER =================

  const handleGoogleRegister = async () => {
    try {
      setLoading(true);

      const user = await signInWithGoogle();

      toast.success(`Welcome ${user.displayName}!`);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= EMAIL REGISTER =================

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all the fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const user = await registerUser(
        name,
        email,
        password
      );

      toast.success(
        `Welcome ${user.displayName || name}!`
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Email already exists.");
          break;

        case "auth/invalid-email":
          toast.error("Invalid email address.");
          break;

        case "auth/weak-password":
          toast.error("Password is too weak.");
          break;

        default:
          toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-[32px] border border-pink-100 bg-white/80 p-10 shadow-[0_20px_60px_rgba(236,72,153,.12)] backdrop-blur-xl">

      <h1 className="text-4xl font-black text-slate-900">
        Create Account ✨
      </h1>

      <p className="mt-3 text-slate-500">
        Join HerCycle AI and start your personalized healthcare journey.
      </p>

      <form
        onSubmit={handleRegister}
        className="mt-10 space-y-6"
      >
        {/* Name */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Full Name
          </label>

          <div className="flex items-center rounded-2xl border border-pink-200 bg-white px-5 py-4">
            <User size={20} className="text-pink-500" />

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="ml-3 w-full bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Email Address
          </label>

          <div className="flex items-center rounded-2xl border border-pink-200 bg-white px-5 py-4">
            <Mail size={20} className="text-pink-500" />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="ml-3 w-full bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Password */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Password
          </label>

          <div className="flex items-center rounded-2xl border border-pink-200 bg-white px-5 py-4">
            <Lock size={20} className="text-pink-500" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="ml-3 w-full bg-transparent outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <EyeOff className="text-slate-400" />
              ) : (
                <Eye className="text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Confirm Password
          </label>

          <div className="flex items-center rounded-2xl border border-pink-200 bg-white px-5 py-4">
            <Lock size={20} className="text-pink-500" />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="ml-3 w-full bg-transparent outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="text-slate-400" />
              ) : (
                <Eye className="text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Register */}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 py-4 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Account"}

          <ArrowRight size={18} />
        </button>
      </form>

      {/* Divider */}

      <div className="my-8 flex items-center">
        <div className="h-px flex-1 bg-slate-200"></div>

        <span className="mx-4 text-sm text-slate-400">
          OR
        </span>

        <div className="h-px flex-1 bg-slate-200"></div>
      </div>

      {/* Google */}

      <button
        type="button"
        disabled={loading}
        onClick={handleGoogleRegister}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 py-4 font-semibold transition hover:border-pink-300 hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FcGoogle size={24} />

        Continue with Google
      </button>

      {/* Login */}

      <p className="mt-8 text-center text-slate-500">
        Already have an account?

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="ml-2 font-semibold text-pink-600 hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default RegisterCard;