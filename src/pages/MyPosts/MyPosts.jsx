import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";
import { apiDelete, apiGet, apiPatch } from "../../lib/api";

const MyPosts = () => {
  const { user, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const {
    data: crops = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["crops", "mine", user?.email],
    queryFn: ({ signal }) =>
      apiGet("/api/crops", { ownerEmail: user.email }, { signal }),
    enabled: !!user?.email,
  });
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const updateCropMutation = useMutation({
    mutationFn: ({ id, payload }) =>
      apiPatch(`/api/crops/${id}/basic`, payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(["crops", "mine", user?.email], (previous) =>
        (previous || []).map((item) =>
          item._id === updated._id ? updated : item
        )
      );
      queryClient.invalidateQueries({ queryKey: ["crops"] });
      queryClient.invalidateQueries({ queryKey: ["crops", "latest"] });
      toast.success("Crop updated successfully");
      setSelectedCrop(null);
      setEditForm(null);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update crop");
    },
  });

  const deleteCropMutation = useMutation({
    mutationFn: (id) => apiDelete(`/api/crops/${id}`),
    onSuccess: (_, id) => {
      queryClient.setQueryData(["crops", "mine", user?.email], (previous) =>
        (previous || []).filter((item) => item._id !== id)
      );
      queryClient.invalidateQueries({ queryKey: ["crops"] });
      queryClient.invalidateQueries({ queryKey: ["crops", "latest"] });
      toast.success("Crop removed");
      setDeleteTarget(null);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete crop");
    },
  });

  const hasPosts = useMemo(() => crops.length > 0, [crops]);

  const openEditModal = (crop) => {
    setSelectedCrop(crop);
    setEditForm({
      name: crop.name,
      type: crop.type,
      pricePerUnit: crop.pricePerUnit,
      unit: crop.unit,
      quantity: crop.quantity,
      description: crop.description,
      location: crop.location,
      image: crop.image,
    });
  };

  const closeEditModal = () => {
    setSelectedCrop(null);
    setEditForm(null);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!selectedCrop) return;
    try {
      const payload = {
        ...editForm,
        pricePerUnit: Number(editForm.pricePerUnit),
        quantity: Number(editForm.quantity),
      };
      if (Number.isNaN(payload.pricePerUnit) || payload.pricePerUnit <= 0) {
        toast.error("Price per unit must be a positive number");
        return;
      }
      if (Number.isNaN(payload.quantity) || payload.quantity < 0) {
        toast.error("Quantity must be zero or a positive number");
        return;
      }
      updateCropMutation.mutate({ id: selectedCrop._id, payload });
    } catch (err) {
      toast.error(err.message || "Failed to update crop");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    deleteCropMutation.mutate(deleteTarget._id);
  };

  if (authLoading || isPending) {
    return <Loader />;
  }

  if (isError) {
    return (
      <p className="px-4 py-16 text-center text-red-500">{error.message}</p>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-800">
            My Crop Posts
          </h2>
          <p className="text-md text-gray-600">
            Manage and update your shared crops on AgroBridge.
          </p>
        </div>
        <span className="badge badge-lg badge-primary">
          {crops.length} Posts
        </span>
      </div>

      {hasPosts ? (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white mt-10">
          <table className="table-auto w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  #
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Type
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Price
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Quantity
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Location
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {crops.map((crop, index) => (
                <tr key={crop._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                    {crop.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {crop.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    ৳{crop.pricePerUnit}/{crop.unit}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {crop.quantity} {crop.unit}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {crop.location}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        onClick={() => openEditModal(crop)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                        onClick={() => setDeleteTarget(crop)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-12 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center text-gray-500">
          You have not added any crops yet. Share your first harvest plan to get
          started.
        </div>
      )}

      {selectedCrop && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-xl font-bold text-gray-800">Edit Crop</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={closeEditModal}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleUpdate} className="mt-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={editForm.type}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price per unit (৳)
                  </label>
                  <input
                    type="number"
                    name="pricePerUnit"
                    value={editForm.pricePerUnit}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
                    min="1"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={editForm.quantity}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={editForm.image}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  disabled={updateCropMutation.isPending}
                >
                  {updateCropMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800">Delete Crop</h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deleteTarget.name}</span>? This
              action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => setDeleteTarget(null)}
                disabled={deleteCropMutation.isPending}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                onClick={handleDelete}
                disabled={deleteCropMutation.isPending}
              >
                {deleteCropMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyPosts;
