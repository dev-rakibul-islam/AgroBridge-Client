const STATUS_STYLES = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  accepted: "border-emerald-200 bg-emerald-50 text-emerald-700",
  rejected: "border-rose-200 bg-rose-50 text-rose-700",
};

const InterestStatusBadge = ({ status }) => {
  const key = status?.toLowerCase?.();
  const tone =
    STATUS_STYLES[key] || "border-slate-200 bg-slate-100 text-slate-600";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${tone}`}
    >
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  );
};

export default InterestStatusBadge;
