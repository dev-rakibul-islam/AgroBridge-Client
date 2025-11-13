import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-center text-white">
    <h1 className="text-6xl font-black">404</h1>
    <p className="mt-4 max-w-md text-lg text-white/80">
      The page you are looking for has sprouted wings and flown away. Let&apos;s
      take you back home.
    </p>
    <Link to="/" className="btn btn-primary mt-8">
      Go to Home
    </Link>
  </div>
);

export default NotFound;
