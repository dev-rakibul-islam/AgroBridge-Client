import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const genericLinks = [
    { path: "/", label: "Home" },
    { path: "/crops", label: "All Crops" },
  ];

  const authedLinks = [
    { path: "/profile", label: "Profile" },
    { path: "/add-crop", label: "Add Crop" },
    { path: "/my-posts", label: "My Posts" },
    { path: "/my-interests", label: "My Interests" },
  ];

  const guestLinks = [
    { path: "/login", label: "Login" },
    { path: "/register", label: "Register" },
  ];

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("You have been logged out");
    } catch (error) {
      toast.error(error.message || "Failed to log out");
    }
  };

  const navItems = user
    ? [...genericLinks, ...authedLinks]
    : [...genericLinks, ...guestLinks];

  const renderLinks = (variant = "desktop") => (
    <ul
      className={`flex ${
        variant === "mobile" ? "flex-col gap-4" : "items-center gap-8"
      }`}
    >
      {navItems.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `font-semibold transition-all duration-300 relative group ${
                isActive
                  ? "text-emerald-600"
                  : "text-slate-700 hover:text-emerald-600"
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-linear-to-r from-emerald-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
          </NavLink>
        </li>
      ))}
      {user && (
        <li>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Logout
          </button>
        </li>
      )}
    </ul>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl">
        <div className="glass mx-4 mt-4 flex items-center justify-between rounded-2xl px-6 py-4 md:px-8">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="https://i.ibb.co.com/zHtkgy2t/agro-main-logo.png"
              alt="AgroBridge Logo"
              className="h-10 w-10 rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <span className="gradient-text text-2xl font-extrabold hidden sm:inline">
              AgroBridge
            </span>
          </Link>
          <nav className="hidden md:block">{renderLinks()}</nav>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-colors duration-300"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <FiX size={28} className="text-emerald-600" />
            ) : (
              <FiMenu size={28} className="text-emerald-600" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden animate-slide-down">
          <nav className="glass-premium mx-4 mt-2 rounded-2xl px-6 py-6 space-y-4">
            {renderLinks("mobile")}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
