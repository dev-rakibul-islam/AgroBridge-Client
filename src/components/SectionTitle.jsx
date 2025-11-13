const SectionTitle = ({ eyebrow, title, description }) => (
  <div className="mb-10 text-center">
    {eyebrow && (
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-600/20">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow" />
        {eyebrow}
      </span>
    )}
    <h2 className="gradient-text mt-4 text-3xl font-extrabold md:text-5xl">
      {title}
    </h2>
    {description && (
      <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
        {description}
      </p>
    )}
  </div>
);

export default SectionTitle;
