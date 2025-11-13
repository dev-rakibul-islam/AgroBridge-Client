import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiUser,
  FiMail,
  FiLock,
  FiImage,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiX,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { apiPost } from "../../lib/api";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
  });

  const from = location.state?.from?.pathname || "/";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));

    if (name === "password") {
      setPasswordChecks({
        length: value.length >= 6,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
      });
    }
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    return "";
  };

  const persistUser = async (authUser) => {
    const profile = {
      email: authUser.email,
      name: authUser.displayName || authUser.email.split("@")[0],
      photo: authUser.photoURL || "",
    };
    await apiPost("/api/users", profile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationMessage = validatePassword(formData.password);
    if (validationMessage) {
      setPasswordError(validationMessage);
      return;
    }
    setPasswordError("");
    setIsSubmitting(true);
    try {
      const credential = await createUser(formData.email, formData.password);
      await updateUserProfile({
        displayName: formData.name,
        photoURL: formData.photo || null,
      });
      try {
        await persistUser({
          email: credential.user.email,
          displayName: formData.name,
          photoURL: formData.photo,
        });
      } catch (persistError) {
        console.error("Failed to persist user", persistError);
        toast.warn(
          persistError.message || "Account created but profile sync failed"
        );
      }
      toast.success("Account created successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Failed to register");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsSubmitting(true);
    try {
      const credential = await googleLogin();
      await persistUser(credential.user);
      toast.success("Signed in with Google");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Google sign-in failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPasswordValid =
    passwordChecks.length &&
    passwordChecks.uppercase &&
    passwordChecks.lowercase;

  return (
    <section className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12">
      <div className="grid w-full gap-8 md:gap-12 md:grid-cols-2 items-start">
        {" "}
        <div className="hidden md:flex flex-col justify-center space-y-8">
          <div>
            <img
              src="https://i.ibb.co.com/zHtkgy2t/agro-main-logo.png"
              alt="AgroBridge Logo"
              className="h-10 w-10 rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <h2 className="mt-6 text-4xl font-extrabold text-slate-900">
              Join the
              <span className="gradient-text block"> AgroBridge Community</span>
            </h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            Create your account to share harvest updates, connect with verified
            buyers, and build long-term partnerships with agri professionals.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                ✓
              </div>
              <span className="text-slate-700 font-semibold">
                List your crops instantly
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                ✓
              </div>
              <span className="text-slate-700 font-semibold">
                Receive buyer inquiries
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                ✓
              </div>
              <span className="text-slate-700 font-semibold">
                Build your network
              </span>
            </div>
          </div>
        </div>
        <div className="glass-premium rounded-2xl p-8 md:p-10 backdrop-blur-lg shadow-premium">
          <h3 className="text-3xl font-bold text-slate-900">Create Account</h3>
          <p className="mt-2 text-slate-600">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-emerald-600 font-bold hover:text-emerald-700"
            >
              Sign in here
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Full Name */}
            <div className="relative">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 text-lg" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-lg glass-premium border border-white/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 placeholder-slate-400 font-medium"
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 text-lg" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-lg glass-premium border border-white/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 placeholder-slate-400 font-medium"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="relative">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Photo URL (Optional)
              </label>
              <div className="relative">
                <FiImage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 text-lg" />
                <input
                  type="url"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-lg glass-premium border border-white/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 placeholder-slate-400 font-medium"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 rounded-lg glass-premium border border-white/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 placeholder-slate-400 font-medium"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    {passwordChecks.length ? (
                      <FiCheck className="text-emerald-500 font-bold" />
                    ) : (
                      <FiX className="text-red-500" />
                    )}
                    <span
                      className={
                        passwordChecks.length
                          ? "text-emerald-600 font-semibold"
                          : "text-slate-600"
                      }
                    >
                      At least 6 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {passwordChecks.uppercase ? (
                      <FiCheck className="text-emerald-500 font-bold" />
                    ) : (
                      <FiX className="text-red-500" />
                    )}
                    <span
                      className={
                        passwordChecks.uppercase
                          ? "text-emerald-600 font-semibold"
                          : "text-slate-600"
                      }
                    >
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {passwordChecks.lowercase ? (
                      <FiCheck className="text-emerald-500 font-bold" />
                    ) : (
                      <FiX className="text-red-500" />
                    )}
                    <span
                      className={
                        passwordChecks.lowercase
                          ? "text-emerald-600 font-semibold"
                          : "text-slate-600"
                      }
                    >
                      One lowercase letter
                    </span>
                  </div>
                </div>
              )}

              {passwordError && (
                <p className="mt-2 text-xs text-red-500 font-semibold">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-linear-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:from-emerald-600 hover:to-cyan-600 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 mt-6"
              disabled={isSubmitting || !isPasswordValid}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span> Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-600 font-semibold">
                or continue with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full mt-8 py-3 rounded-lg border-2 border-white/30 glass-premium text-slate-900 font-bold hover:border-emerald-500 hover:bg-white/50 transition-all duration-300 flex items-center justify-center gap-3"
            onClick={handleGoogleSignup}
            disabled={isSubmitting}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {isSubmitting ? "Signing up..." : "Continue with Google"}
          </button>

          <p className="mt-6 text-center text-xs text-slate-600">
            By creating an account, you agree to our{" "}
            <span className="text-emerald-600 font-semibold cursor-pointer hover:text-emerald-700">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-emerald-600 font-semibold cursor-pointer hover:text-emerald-700">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
