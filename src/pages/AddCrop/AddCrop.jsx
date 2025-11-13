import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiPackage,
  FiMapPin,
  FiDollarSign,
  FiImage,
  FiFileText,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { apiPost } from "../../lib/api";

const initialFormState = {
  name: "",
  type: "",
  pricePerUnit: "",
  unit: "kg",
  quantity: "",
  description: "",
  location: "",
  image: "",
};

const AddCrop = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const addCropMutation = useMutation({
    mutationFn: (payload) => apiPost("/api/crops", payload),
    onSuccess: () => {
      toast.success("🎉 Crop added successfully!");
      setFormData(initialFormState);
      setErrors({});
      queryClient.invalidateQueries({ queryKey: ["crops"] });
      if (user?.email) {
        queryClient.invalidateQueries({
          queryKey: ["crops", "mine", user.email],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["crops", "latest"] });
      navigate("/my-posts");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add crop");
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Crop name is required";
    if (!formData.type.trim()) newErrors.type = "Type is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.pricePerUnit || formData.pricePerUnit <= 0)
      newErrors.pricePerUnit = "Valid price is required";
    if (!formData.quantity || formData.quantity < 0)
      newErrors.quantity = "Valid quantity is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields correctly");
      return;
    }

    if (!user) return;

    const payload = {
      ...formData,
      pricePerUnit: Number(formData.pricePerUnit),
      quantity: Number(formData.quantity),
      owner: {
        ownerEmail: user.email,
        ownerName: user.displayName || user.email.split("@")[0],
      },
    };

    if (payload.pricePerUnit <= 0 || Number.isNaN(payload.pricePerUnit)) {
      toast.error("Price per unit must be a positive number");
      return;
    }

    if (payload.quantity < 0 || Number.isNaN(payload.quantity)) {
      toast.error("Quantity must be zero or a positive number");
      return;
    }

    try {
      await addCropMutation.mutateAsync(payload);
    } catch (error) {
      // Error feedback handled inside the mutation onError callback.
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <div className="glass-premium rounded-2xl p-8 md:p-12 backdrop-blur-lg shadow-premium">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-900">Add a new crop</h2>
          <p className="mt-3 text-slate-600 text-lg">
            Share your upcoming harvest details to connect with interested
            buyers across Bangladesh.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Two Column Layout */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Crop Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Crop Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiPackage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 text-lg" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg glass-premium border ${
                    errors.name ? "border-red-500" : "border-white/50"
                  } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 placeholder-slate-400 font-medium`}
                  placeholder="e.g., Summer Tomato, Maize"
                  required
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500 font-semibold">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg glass-premium border ${
                  errors.type ? "border-red-500" : "border-white/50"
                } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 placeholder-slate-400 font-medium`}
                placeholder="Vegetable, Fruit, Grain..."
                required
              />
              {errors.type && (
                <p className="mt-1 text-xs text-red-500 font-semibold">
                  {errors.type}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 text-lg" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg glass-premium border ${
                    errors.location ? "border-red-500" : "border-white/50"
                  } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 placeholder-slate-400 font-medium`}
                  placeholder="District, region"
                  required
                />
              </div>
              {errors.location && (
                <p className="mt-1 text-xs text-red-500 font-semibold">
                  {errors.location}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Price per Unit (৳) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 text-lg" />
                <input
                  type="number"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg glass-premium border ${
                    errors.pricePerUnit ? "border-red-500" : "border-white/50"
                  } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 placeholder-slate-400 font-medium`}
                  min="1"
                  step="0.01"
                  required
                />
              </div>
              {errors.pricePerUnit && (
                <p className="mt-1 text-xs text-red-500 font-semibold">
                  {errors.pricePerUnit}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Unit
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg glass-premium border border-white/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 font-medium"
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="ton">Ton</option>
                <option value="bag">Bag</option>
                <option value="dozen">Dozen</option>
                <option value="liter">Liter</option>
                <option value="unit">Unit</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Estimated Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg glass-premium border ${
                  errors.quantity ? "border-red-500" : "border-white/50"
                } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 placeholder-slate-400 font-medium`}
                min="0"
                required
              />
              {errors.quantity && (
                <p className="mt-1 text-xs text-red-500 font-semibold">
                  {errors.quantity}
                </p>
              )}
            </div>

            {/* Photo URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Photo URL <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiImage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 text-lg" />
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg glass-premium border ${
                    errors.image ? "border-red-500" : "border-white/50"
                  } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 placeholder-slate-400 font-medium`}
                  placeholder="https://example.com/crop.jpg"
                  required
                />
              </div>
              {errors.image && (
                <p className="mt-1 text-xs text-red-500 font-semibold">
                  {errors.image}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiFileText className="absolute left-4 top-4 text-emerald-600 text-lg pointer-events-none" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg glass-premium border ${
                    errors.description ? "border-red-500" : "border-white/50"
                  } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 placeholder-slate-400 font-medium resize-none`}
                  placeholder="Highlight crop quality, nurturing process, harvest timeline, special features, etc."
                  rows="5"
                  required
                />
              </div>
              {errors.description && (
                <p className="mt-1 text-xs text-red-500 font-semibold">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 py-3 rounded-lg bg-linear-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:from-emerald-600 hover:to-cyan-600 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
              disabled={addCropMutation.isPending}
            >
              {addCropMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span> Saving...
                </span>
              ) : (
                "✨ Add Crop"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/my-posts")}
              className="px-6 py-3 rounded-lg border-2 border-slate-300 text-slate-700 font-bold hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddCrop;
