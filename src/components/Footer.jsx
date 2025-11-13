import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => (
  <footer className="mt-2 relative overflow-hidden">
    <div className="absolute inset-0 bg-black/80" />
    <div className="mx-auto max-w-7xl px-4 pb-12 relative z-10">
      <div className=" rounded-3xl p-8 md:p-12 backdrop-blur-lg  shadow-premium">
        <div className="grid gap-10 md:grid-cols-5">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-linear-to-br from-emerald-500 to-cyan-500 text-white font-bold text-lg flex items-center justify-center shadow-lg">
                AB
              </div>
              <span className="gradient-text text-2xl font-extrabold">
                AgroBridge
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-200/80 leading-relaxed">
              A collaborative hub where farmers, traders, and consumers unite to
              grow stronger agri connections and build sustainable agricultural
              futures.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-emerald-500 text-slate-100 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-emerald-500 text-slate-100 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaXTwitter size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-emerald-500 text-slate-100 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-emerald-500 text-slate-100 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Navigation</h4>
            <ul className="space-y-3 text-sm text-slate-200/80">
              <li>
                <Link
                  to="/"
                  className="hover:text-emerald-400 transition-colors duration-300 font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/crops"
                  className="hover:text-emerald-400 transition-colors duration-300 font-medium"
                >
                  All Crops
                </Link>
              </li>
              <li>
                <Link
                  to="/add-crop"
                  className="hover:text-emerald-400 transition-colors duration-300 font-medium"
                >
                  Add Crop
                </Link>
              </li>
              <li>
                <Link
                  to="/my-posts"
                  className="hover:text-emerald-400 transition-colors duration-300 font-medium"
                >
                  My Posts
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-200/80">
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors duration-300 font-medium"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors duration-300 font-medium"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors duration-300 font-medium"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors duration-300 font-medium"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-slate-200/80">
              <li className="font-medium">📧 support@agrobridge.com</li>
              <li className="font-medium">📱 +880 1863 972 739</li>
              <li className="font-medium">📍 Dhaka, Bangladesh</li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors duration-300 font-medium"
                >
                  Contact Form →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/10" />

        {/* Bottom Section */}
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div className="text-sm text-slate-300">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-bold text-emerald-400">AgroBridge</span>. All
            rights reserved with ❤️
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end text-xs text-slate-300">
            <a
              href="#"
              className="hover:text-emerald-400 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a
              href="#"
              className="hover:text-emerald-400 transition-colors duration-300"
            >
              Terms of Service
            </a>
            <span>•</span>
            <a
              href="#"
              className="hover:text-emerald-400 transition-colors duration-300"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
