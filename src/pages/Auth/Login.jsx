import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { apiPost } from "../../lib/api";

const Login = () => {
  const { signIn, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || "/";

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
    setIsSubmitting(true);
    try {
      const credential = await signIn(email, password);
      try {
        await persistUser(credential.user);
      } catch (persistError) {
        console.error("Failed to persist user", persistError);
        toast.warn(persistError.message || "Logged in but profile sync failed");
      }
      toast.success("Welcome back to AgroBridge");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Failed to login");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      const credential = await googleLogin();
      try {
        await persistUser(credential.user);
      } catch (persistError) {
        console.error("Failed to persist user", persistError);
        toast.warn(persistError.message || "Signed in but profile sync failed");
      }
      toast.success("Signed in with Google");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Google sign-in failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12">
      <div className="grid w-full gap-8 md:gap-12 md:grid-cols-2 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:flex flex-col justify-center space-y-8">
          <div>
            <img
              src="https://i.ibb.co.com/zHtkgy2t/agro-main-logo.png"
              alt="AgroBridge Logo"
              className="h-10 w-10 rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <h2 className="mt-6 text-4xl font-extrabold text-slate-900">
              Welcome back to
              <span className="gradient-text block"> AgroBridge</span>
            </h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            Login to manage your crops, track interests, and continue growing
            meaningful agri connections with farmers and buyers across
            Bangladesh.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                ✓
              </div>
              <span className="text-slate-700 font-semibold">
                Connect with verified partners
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                ✓
              </div>
              <span className="text-slate-700 font-semibold">
                Manage your crop listings
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                ✓
              </div>
              <span className="text-slate-700 font-semibold">
                Track buyer interests in real-time
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="glass-premium rounded-2xl p-8 md:p-10 backdrop-blur-lg shadow-premium">
          <h3 className="text-3xl font-bold text-slate-900">Login</h3>
          <p className="mt-2 text-slate-600">
            New to AgroBridge?{" "}
            <Link
              to="/register"
              className="text-emerald-600 font-bold hover:text-emerald-700"
            >
              Create an account
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email */}
            <div className="relative">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 text-lg" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg glass-premium border border-white/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 placeholder-slate-400 font-medium"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-slate-900">
                  Password
                </label>
                <span className="text-xs text-emerald-600 font-semibold cursor-pointer hover:text-emerald-700">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-linear-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:from-emerald-600 hover:to-cyan-600 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span> Logging in...
                </span>
              ) : (
                "Login to Account"
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
            onClick={handleGoogleLogin}
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
            {isSubmitting ? "Signing in..." : "Continue with Google"}
          </button>

          <p className="mt-6 text-center text-xs text-slate-600">
            By logging in, you agree to our{" "}
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

export default Login;
