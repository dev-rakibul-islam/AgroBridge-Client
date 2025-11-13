import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiSearch, FiX } from "react-icons/fi";
import CropCard from "../../components/CropCard";
import Loader from "../../components/Loader";
import SectionTitle from "../../components/SectionTitle";
import { apiGet } from "../../lib/api";

const AllCrops = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const {
    data: crops = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["crops", { search: query || null }],
    queryFn: ({ signal }) =>
      apiGet("/api/crops", query ? { search: query } : undefined, { signal }),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(searchTerm.trim());
  };

  const resetSearch = () => {
    setSearchTerm("");
    setQuery("");
  };

  const heading = useMemo(
    () =>
      query
        ? `Search results for "${query}"`
        : "Discover crops shared by the community",
    [query]
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionTitle
        eyebrow="🌾 Marketplace"
        title="All listed crops"
        description={heading}
      />

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="mx-auto mb-12 w-full max-w-3xl">
        <div className="glass-premium flex items-center gap-3 rounded-2xl p-2 backdrop-blur-lg border border-white/50 shadow-md">
          <FiSearch className="ml-2 text-emerald-600 text-xl" />
          <input
            type="text"
            placeholder="Search by crop name, type, or location..."
            className="flex-1 bg-transparent focus:outline-none placeholder-slate-400 font-medium text-slate-900 py-2"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-linear-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:from-emerald-600 hover:to-cyan-600 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Search
          </button>
          {query && (
            <button
              type="button"
              onClick={resetSearch}
              className="px-3 py-2 rounded-lg hover:bg-white/20 transition-colors duration-300 text-slate-600"
              title="Clear search"
            >
              <FiX size={20} />
            </button>
          )}
        </div>
      </form>

      {/* Results */}
      {isPending ? (
        <Loader />
      ) : isError ? (
        <div className="glass-premium rounded-2xl p-12 text-center border border-red-200/50">
          <p className="text-lg text-red-500 font-bold">⚠️ {error.message}</p>
          <p className="text-sm text-slate-600 mt-2">
            Please try again or contact support
          </p>
        </div>
      ) : crops.length === 0 ? (
        <div className="glass-premium rounded-2xl p-12 text-center border border-dashed border-slate-200">
          <div className="text-5xl mb-3">🔍</div>
          <p className="text-lg text-slate-600 font-semibold">
            No crops found matching your search.
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Try adjusting your search terms or browse all listings.
          </p>
          {query && (
            <button
              onClick={resetSearch}
              className="mt-4 px-6 py-2 rounded-lg bg-linear-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300"
            >
              View All Crops
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="mb-6 p-4 glass-premium rounded-lg border border-white/50 text-sm text-slate-700 font-semibold">
            Found{" "}
            <span className="text-emerald-600 font-bold">{crops.length}</span>{" "}
            crop{crops.length !== 1 ? "s" : ""} {query ? `for "${query}"` : ""}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {crops.map((crop) => (
              <CropCard key={crop._id} crop={crop} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default AllCrops;
