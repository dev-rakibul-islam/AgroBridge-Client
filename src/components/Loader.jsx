const Loader = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="flex w-full max-w-xs flex-col items-center justify-center gap-6 text-center">
      <p className="text-lg font-semibold tracking-wide text-emerald-600">
        Loading...
      </p>
      <div
        className="flex w-full flex-col items-center justify-center gap-4"
        aria-hidden="true"
      >
        <div className="flex items-center justify-center">
          <div className="flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-blue-400 text-4xl text-blue-400">
            <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-red-400 text-2xl text-red-400" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Loader;
