import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

import {
  signInWithGoogle,
  loginUser,
} from "../../../services/authService";

function LoginCard() {
  const navigate = useNavigate();

  // ================= FORM STATE =================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ================= UI STATE =================

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= EMAIL LOGIN =================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      setLoading(true);

      const user = await loginUser(email, password);

      toast.success(`Welcome ${user.displayName || "User"}!`);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No account found.");
          break;

        case "auth/invalid-credential":
          toast.error("Invalid email or password.");
          break;

        case "auth/wrong-password":
          toast.error("Incorrect password.");
          break;

        case "auth/invalid-email":
          toast.error("Invalid email.");
          break;

        default:
          toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================

  const handleGoogleLogin = async () => {
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

  return (
    <div className="w-full max-w-md rounded-[32px] border border-pink-100 bg-white/80 p-10 shadow-[0_20px_60px_rgba(236,72,153,.12)] backdrop-blur-xl">

      <h1 className="text-4xl font-black text-slate-900">
        Welcome Back 👋
      </h1>

      <p className="mt-3 text-slate-500">
        Login to continue your personalized women's healthcare journey.
      </p>

      <form
        onSubmit={handleLogin}
        className="mt-10 space-y-6"
      >

        {/* Email */}

        <div>

          <label className="mb-2 block font-medium text-slate-700">
            Email Address
          </label>

          <div className="flex items-center rounded-2xl border border-pink-200 bg-white px-5 py-4">

            <Mail
              size={20}
              className="text-pink-500"
            />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            <Lock
              size={20}
              className="text-pink-500"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Remember */}

        <div className="flex items-center justify-between">

          <label className="flex items-center gap-2 text-sm text-slate-600">

            <input
              type="checkbox"
              className="accent-pink-500"
            />

            Remember Me

          </label>

          <button
            type="button"
            className="text-sm font-medium text-pink-600 hover:underline"
          >
            Forgot Password?
          </button>

        </div>

        {/* Login */}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 py-4 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging In..." : "Login"}

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
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 py-4 font-semibold transition hover:border-pink-300 hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FcGoogle size={24} />

        Continue with Google

      </button>

      {/* Register */}

      <p className="mt-8 text-center text-slate-500">

        Don't have an account?

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="ml-2 font-semibold text-pink-600 hover:underline"
        >
          Register
        </button>

      </p>

    </div>
  );
}

export default LoginCard;