import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CropCard = ({ crop }) => {
  const {
    _id,
    name,
    type,
    pricePerUnit,
    unit,
    quantity,
    location,
    image,
    owner,
  } = crop;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-transform duration-300 hover:-translate-y-1 focus-within:-translate-y-1">
      <div className="relative h-52 bg-slate-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-slate-900/35 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
              {type}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-slate-900 transition-colors duration-200 group-hover:text-emerald-600">
              {name}
            </h3>
          </div>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            📍 {location}
          </span>
        </div>

        <dl className="grid grid-cols-2 gap-4 text-sm text-slate-600">
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">
              Price
            </dt>
            <dd className="mt-1 font-semibold text-emerald-600">
              ৳{pricePerUnit}/{unit}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">
              Available
            </dt>
            <dd className="mt-1 font-semibold text-slate-700">
              {quantity} {unit}
            </dd>
          </div>
          {owner?.ownerName && (
            <div className="col-span-2 border-t border-slate-100 pt-3 text-sm">
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                Listed by
              </dt>
              <dd className="mt-1 font-medium text-slate-700">
                <span className="text-emerald-600">{owner.ownerName}</span>
                {owner.ownerEmail ? (
                  <span className="ml-2 text-xs text-slate-500">
                    {owner.ownerEmail}
                  </span>
                ) : null}
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-auto pt-3">
          <Link
            to={`/crops/${_id}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            View Details
            <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CropCard;
