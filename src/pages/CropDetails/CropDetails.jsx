import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import InterestStatusBadge from "../../components/InterestStatusBadge";
import useAuth from "../../hooks/useAuth";
import { apiGet, apiPatch, apiPost } from "../../lib/api";

const CropDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    data: crop,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["crop", id],
    queryFn: ({ signal }) => apiGet(`/api/crops/${id}`, undefined, { signal }),
    enabled: !!id,
  });
  const interestMutation = useMutation({
    mutationFn: (payload) => apiPost("/api/interests", payload),
    onSuccess: (response) => {
      queryClient.setQueryData(["crop", id], response.crop);
      queryClient.invalidateQueries({ queryKey: ["crops"] });
      queryClient.invalidateQueries({ queryKey: ["crops", "latest"] });
      setQuantity(1);
      setMessage("");
      toast.success("Interest sent successfully");
      setConfirmOpen(false);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to submit interest");
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ interestId, status, cropId }) =>
      apiPatch(`/api/interests/${interestId}/status`, {
        cropId,
        status,
      }),
    onSuccess: (updated, variables) => {
      queryClient.setQueryData(["crop", id], updated);
      queryClient.invalidateQueries({ queryKey: ["crops"] });
      queryClient.invalidateQueries({ queryKey: ["crops", "latest"] });
      toast.success(`Interest ${variables.status}`);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update interest");
    },
  });

  const isOwner = useMemo(
    () => crop && user && crop.owner?.ownerEmail === user.email,
    [crop, user]
  );

  const existingInterest = useMemo(
    () =>
      crop?.interests?.find((interest) => interest.userEmail === user?.email) ??
      null,
    [crop, user]
  );

  const totalPrice = useMemo(() => {
    if (!crop) return 0;
    const price = Number(crop.pricePerUnit) || 0;
    const quantityNumber = Number(quantity) || 0;
    return quantityNumber * price;
  }, [crop, quantity]);

  const handleQuantityChange = (event) => {
    const value = Number(event.target.value);
    if (Number.isNaN(value)) {
      setQuantity("");
      return;
    }
    if (value < 1) {
      setQuantity(1);
      return;
    }
    if (crop && value > crop.quantity) {
      setQuantity(crop.quantity);
      return;
    }
    setQuantity(value);
  };

  const handleInterestSubmit = (event) => {
    event.preventDefault();
    if (!crop) return;
    if (Number(quantity) < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    setConfirmOpen(true);
  };

  const confirmInterestSubmission = async () => {
    if (!crop || !user) return;
    const payload = {
      cropId: crop._id,
      userEmail: user.email,
      userName: user.displayName || user.email.split("@")[0],
      userPhoto: user.photoURL,
      quantity: Number(quantity),
      message,
    };
    interestMutation.mutate(payload);
  };

  const handleStatusUpdate = async (interestId, status) => {
    if (!crop) return;
    statusMutation.mutate({ interestId, status, cropId: crop._id });
  };

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-red-500">{error.message}</p>
        <button
          type="button"
          className="btn btn-primary mt-6"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
    );
  }

  if (!crop) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* First Section: Image and Crop Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src={crop.image}
            alt={crop.name}
            className="w-full h-autoct-cover"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{crop.name}</h1>
          <p className="text-gray-600">{crop.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-500">Price per unit</p>
              <p className="text-xl font-semibold text-gray-800">
                ৳{crop.pricePerUnit}/{crop.unit}
              </p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-500">Available quantity</p>
              <p className="text-xl font-semibold text-gray-800">
                {crop.quantity} {crop.unit}
              </p>
            </div>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-500">Posted by</p>
            <p className="text-lg font-semibold text-gray-800">
              {crop.owner?.ownerName}
            </p>
            <p className="text-sm text-gray-500">{crop.owner?.ownerEmail}</p>
          </div>
        </div>
      </div>

      {/* Second Section: Interest Form or Received Interests */}
      <div className="mt-12">
        {!isOwner ? (
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800">
              Express Interest
            </h2>
            {existingInterest ? (
              <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
                You have already sent an interest. Status:{" "}
                <InterestStatusBadge status={existingInterest.status} />
              </div>
            ) : (
              <form onSubmit={handleInterestSubmit} className="space-y-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity ({crop.unit})
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={crop.quantity}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                    rows={4}
                    placeholder="Share any specifics (delivery, timeline, etc.)"
                  />
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex justify-between text-gray-800 font-semibold">
                    <span>Total Price</span>
                    <span>৳{totalPrice.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Calculated automatically based on quantity and price per
                    unit.
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700"
                  disabled={interestMutation.isPending}
                >
                  {interestMutation.isPending
                    ? "Submitting..."
                    : "Submit Interest"}
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800">
              Received Interests
            </h2>
            {crop.interests && crop.interests.length > 0 ? (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Buyer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {crop.interests.map((interest) => (
                      <tr key={interest._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {interest.userName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {interest.userEmail}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {interest.quantity} {crop.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ৳{interest.totalPrice?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {interest.message || "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <InterestStatusBadge status={interest.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {interest.status === "pending" ? (
                            <div className="flex space-x-2">
                              <button
                                className="px-2 py-1 bg-green-500 text-white text-xs rounded-md hover:bg-green-600"
                                onClick={() =>
                                  handleStatusUpdate(interest._id, "accepted")
                                }
                                disabled={statusMutation.isPending}
                              >
                                Accept
                              </button>
                              <button
                                className="px-2 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600"
                                onClick={() =>
                                  handleStatusUpdate(interest._id, "rejected")
                                }
                                disabled={statusMutation.isPending}
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">
                              No action
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-4 text-gray-600">No interests received yet.</p>
            )}
          </div>
        )}
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-medium text-gray-900">
              Confirm Interest
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              You are about to send an interest for {quantity} {crop.unit} of{" "}
              {crop.name}. Total price: ৳{totalPrice.toLocaleString()}.
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={() => setConfirmOpen(false)}
                disabled={interestMutation.isPending}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                onClick={confirmInterestSubmission}
                disabled={interestMutation.isPending}
              >
                {interestMutation.isPending ? "Submitting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropDetails;
