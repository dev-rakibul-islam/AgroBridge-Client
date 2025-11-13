import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";
import { apiPost } from "../../lib/api";

const Profile = () => {
  const { user, loading: authLoading, updateUserProfile } = useAuth();
  const queryClient = useQueryClient();
  const {
    data: profileData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-profile", user?.email],
    enabled: !!user?.email,
    queryFn: ({ signal }) => {
      const fallback = {
        email: user.email,
        name: user.displayName || user.email.split("@")[0],
        photo: user.photoURL || "",
      };
      return apiPost("/api/users", fallback, { signal });
    },
  });
  const [profile, setProfile] = useState(null);
  const saveProfileMutation = useMutation({
    mutationFn: (payload) => apiPost("/api/users", payload),
    onSuccess: async (updated) => {
      setProfile(updated);
      if (user?.email) {
        queryClient.setQueryData(["user-profile", user.email], updated);
      }
      try {
        await updateUserProfile({
          displayName: updated.name,
          photoURL: updated.photo || null,
        });
      } catch (syncError) {
        toast.warn(
          syncError.message || "Profile saved but failed to sync with auth"
        );
      }
      toast.success("Profile saved successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to save profile");
    },
  });

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
    }
  }, [profileData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!profile?.email) return;
    saveProfileMutation.mutate({
      email: profile.email,
      name: profile.name,
      photo: profile.photo,
    });
  };

  if (authLoading || isPending) {
    return <Loader />;
  }

  if (isError) {
    return (
      <p className="px-4 py-16 text-center text-red-500">{error.message}</p>
    );
  }

  if (!profile) {
    return <Loader />;
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-emerald-50 via-white to-emerald-100 px-4 py-16 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-28 top-16 h-60 w-60 rounded-full bg-emerald-300/40 blur-3xl" />
        <div className="absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-lime-300/40 blur-3xl" />
        <div className="absolute left-1/2 top-0 h-80 w-full max-w-4xl -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 lg:flex-row lg:items-stretch">
        <aside className="w-full lg:max-w-sm">
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur">
            <div
              className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-emerald-500/25 to-transparent"
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center text-center">
              <img
                src={
                  profile.photo ||
                  "https://i.ibb.co/F8fRMJ8/user-placeholder.png"
                }
                alt={profile.name || profile.email}
                className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl ring-2 ring-emerald-100"
              />
              <span className="mt-6 inline-flex items-center rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
                AgroBridge member
              </span>
              <h2 className="mt-6 text-2xl font-semibold text-slate-900 sm:text-3xl">
                {profile.name}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{profile.email}</p>
              <p className="mt-6 text-sm leading-6 text-slate-600">
                Keep your marketplace identity fresh and recognizable. Updating
                your public details helps farmers and buyers trust who they are
                working with.
              </p>
            </div>
            <div className="mt-8 grid gap-4 text-sm text-slate-600">
              <div className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Account status
                </p>
                <p className="mt-1 font-medium text-slate-900">
                  Active and connected
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Primary contact
                </p>
                <p className="mt-1 break-all font-medium text-slate-900">
                  {profile.email}
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="relative flex-1">
          <div className="relative h-full overflow-hidden rounded-3xl border border-emerald-100 bg-white/90 shadow-2xl backdrop-blur">
            <div className="absolute inset-x-0 top-0 flex h-3 w-full overflow-hidden rounded-t-3xl">
              <span className="flex-1 bg-emerald-400" />
              <span className="flex-1 bg-lime-300" />
              <span className="flex-1 bg-emerald-200" />
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative z-10 flex h-full flex-col gap-10 px-8 pb-10 pt-12 sm:px-12 sm:pt-14"
            >
              <div className="max-w-xl">
                <p className="text-sm font-medium uppercase tracking-widest text-emerald-600">
                  Profile settings
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Personalize your AgroBridge presence
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Choose a friendly name and a photo that represents you best.
                  These details appear on your crop listings, offers, and
                  messages across the platform.
                </p>
              </div>

              <div className="grid flex-1 gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-sm font-medium text-slate-700">
                    Display name
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="input input-bordered w-full rounded-2xl border-slate-200 bg-white/90 px-4 py-3 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-sm font-medium text-slate-700">
                    Photo URL
                  </span>
                  <input
                    type="url"
                    name="photo"
                    value={profile.photo || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full rounded-2xl border-slate-200 bg-white/90 px-4 py-3 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    placeholder="https://your-image-link"
                    autoComplete="photo"
                  />
                </label>
              </div>

              <div className="flex flex-col-reverse items-center justify-between gap-4 pt-4 sm:flex-row">
                <p className="text-xs text-slate-500">
                  Your changes are saved securely and sync with your AgroBridge
                  account instantly.
                </p>
                <button
                  type="submit"
                  className="btn btn-sm inline-flex items-center justify-center rounded-md bg-emerald-500 px-5 py-1 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={saveProfileMutation.isPending}
                >
                  {saveProfileMutation.isPending
                    ? "Saving changes..."
                    : "Save profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
