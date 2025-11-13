import { Link, useRouteError } from "react-router-dom";

const RouteError = () => {
  const error = useRouteError();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-4 text-center">
      <h1 className="text-4xl font-bold text-slate-900">
        Something went wrong
      </h1>
      <p className="mt-3 text-slate-600">
        {error?.statusText || error?.message || "Unexpected error"}
      </p>
      <Link to="/" className="btn btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
};

export default RouteError;
