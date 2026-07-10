import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import logo from "../../../assets/logos/hercycle-logo.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Prediction", path: "/prediction" },
  { name: "Community", path: "/community" },
  { name: "About", path: "/about" },
];

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-md dark:bg-slate-900/80"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-5">

        {/* Logo */}

        <NavLink to="/" className="flex items-center">
          <img
            src={logo}
            alt="HerCycle AI"
            className="h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </NavLink>

        {/* Desktop Menu */}

        <div className="hidden items-center gap-10 lg:flex">

          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-pink-600 pb-1 text-[17px] font-semibold text-pink-600"
                  : "text-[17px] font-medium text-slate-700 transition-all duration-300 hover:text-pink-600"
              }
            >
              {item.name}
            </NavLink>
          ))}

        </div>

        {/* Right Side */}

        <div className="hidden items-center gap-5 lg:flex">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full p-2.5 transition hover:bg-pink-100 dark:hover:bg-slate-800"
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          <button
            onClick={() => navigate("/login")}
            className="rounded-full border border-slate-300 px-7 py-2.5 text-[16px] font-medium transition hover:border-pink-500 hover:text-pink-600"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-7 py-2.5 text-[16px] font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            Get Started
          </button>

        </div>

        {/* Mobile Menu Button */}

        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="bg-white shadow-xl dark:bg-slate-900 lg:hidden">

          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block border-b px-8 py-5 text-lg ${
                  isActive
                    ? "font-semibold text-pink-600"
                    : "text-slate-700 hover:bg-pink-50 dark:hover:bg-slate-800"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <div className="flex flex-col gap-4 p-6">

            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="rounded-full border py-3 text-lg"
            >
              Login
            </button>

            <button
              onClick={() => {
                navigate("/signup");
                setMenuOpen(false);
              }}
              className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 text-lg font-semibold text-white"
            >
              Get Started
            </button>

          </div>

        </div>
      )}
    </nav>
  );
}

export default Navbar;