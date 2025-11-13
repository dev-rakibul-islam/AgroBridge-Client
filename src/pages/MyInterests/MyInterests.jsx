import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import InterestStatusBadge from "../../components/InterestStatusBadge";
import useAuth from "../../hooks/useAuth";
import { apiGet } from "../../lib/api";

const sortOptions = [
  { value: "createdAt-desc", label: "Newest first" },
  { value: "quantity-desc", label: "Quantity: high to low" },
  { value: "quantity-asc", label: "Quantity: low to high" },
  { value: "status", label: "Status" },
];

const MyInterests = () => {
  const { user, loading: authLoading } = useAuth();
  const [sort, setSort] = useState(sortOptions[0].value);

  const {
    data: interests = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["interests", user?.email, sort],
    queryFn: ({ signal }) => {
      const params = { email: user.email };
      if (sort !== "createdAt-desc") {
        params.sort = sort;
      }
      return apiGet("/api/interests", params, { signal });
    },
    enabled: !!user?.email,
  });

  if (authLoading || isPending) {
    return <Loader />;
  }

  if (isError) {
    return (
      <p className="px-4 py-16 text-center text-red-500">{error.message}</p>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">
            My interests
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            Keep an eye on every crop you have shown interest in and see how
            each request is progressing.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-slate-600">Sort by</span>
          <select
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {interests.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white/80 p-12 text-center text-slate-600">
          You haven&apos;t expressed interest in any crops yet.
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 md:hidden">
            {interests.map((interest) => (
              <article
                key={interest._id}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <header className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-slate-900">
                      {interest.cropName}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      ৳{interest.pricePerUnit}/{interest.unit}
                    </p>
                  </div>
                  <InterestStatusBadge status={interest.status} />
                </header>

                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-slate-600">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-500">
                      Owner
                    </dt>
                    <dd className="mt-1 font-medium text-slate-700">
                      {interest.ownerName}
                    </dd>
                    <dd className="text-xs text-slate-500">
                      {interest.ownerEmail}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-500">
                      Quantity
                    </dt>
                    <dd className="mt-1 font-medium text-slate-700">
                      {interest.quantity} {interest.unit}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-500">
                      Total value
                    </dt>
                    <dd className="mt-1 font-medium text-slate-700">
                      {typeof interest.totalPrice === "number"
                        ? `৳${interest.totalPrice.toLocaleString()}`
                        : "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-500">
                      Requested
                    </dt>
                    <dd className="mt-1 font-medium text-slate-700">
                      {new Date(interest.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>

                {interest.message && (
                  <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                    {interest.message}
                  </p>
                )}

                <p className="mt-4 text-xs text-slate-500">
                  Requested by {user?.displayName || user?.email}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-4">Crop</th>
                  <th className="px-6 py-4">Owner</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Requested</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {interests.map((interest) => (
                  <tr key={interest._id} className="align-top">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">
                        {interest.cropName}
                      </div>
                      <div className="text-xs text-slate-500">
                        ৳{interest.pricePerUnit}/{interest.unit}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="font-medium text-slate-900">
                        {interest.ownerName}
                      </div>
                      <div className="text-xs text-slate-500">
                        {interest.ownerEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {interest.quantity} {interest.unit}
                    </td>
                    <td className="px-6 py-4">
                      {typeof interest.totalPrice === "number"
                        ? `৳${interest.totalPrice.toLocaleString()}`
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {interest.message || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <InterestStatusBadge status={interest.status} />
                    </td>
                    <td className="px-6 py-4">
                      {new Date(interest.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default MyInterests;
