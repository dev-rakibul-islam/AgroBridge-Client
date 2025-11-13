const SectionTitle = ({ eyebrow, title, description }) => (
  <div className="mb-6 md:mb-10 text-center">
    {eyebrow && (
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 md:px-4 py-0.5 md:py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-600/20">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow" />
        {eyebrow}
      </span>
    )}
    <h2 className="gradient-text mt-2 md:mt-4 text-2xl md:text-3xl lg:text-5xl font-extrabold">
      {title}
    </h2>
    {description && (
      <p className="mx-auto mt-2 md:mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-slate-600">
        {description}
      </p>
    )}
  </div>
);

export default SectionTitle;
