import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axiosConfig";
import { toast } from "react-hot-toast";
import { FaCamera, FaTrash } from "react-icons/fa";

const RoomDetailsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const isUpdateMode = location.pathname === "/update-room-details";
  const [roomDescriptionId, setRoomDescriptionId] = useState(null);
  const [rent, setRent] = useState(0);

  useEffect(() => {
    if (isUpdateMode) {
      const fetchRoomDetails = async () => {
        try {
          const response = await api.get(
            `/room-description/provider/${user._id}`
          );
          if (response.data && response.data.length > 0) {
            const roomData = response.data[0];
            setRoomDescriptionId(roomData._id);
            reset({
              ...roomData,
              availabilityDate: new Date(roomData.availabilityDate)
                .toISOString()
                .split("T")[0],
            });
            if (roomData.photoUrls) {
              setPhotoPreviews(roomData.photoUrls);
            }
            if (roomData.rent) {
              setRent(roomData.rent);
            }
          }
        } catch (error) {
          console.error("Error fetching room details:", error);
          toast.error("Error loading room details");
        }
      };

      fetchRoomDetails();
    }
  }, [isUpdateMode, user._id, reset]);

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + photos.length > 5) {
      toast.error("Maximum 5 photos allowed");
      return;
    }

    const newPhotos = [...photos, ...files];
    setPhotos(newPhotos);

    // Create previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreviews([...photoPreviews, ...newPreviews]);
  };

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    const newPreviews = photoPreviews.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    setPhotoPreviews(newPreviews);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      const roomData = {
        providerId: user._id,
        ...data,
        availabilityDate: new Date(data.availabilityDate),
        rent,
      };
      formData.append("roomData", JSON.stringify(roomData));

      photos.forEach((photo) => {
        formData.append("photos", photo);
      });

      const endpoint = isUpdateMode
        ? `/room-description/${roomDescriptionId}`
        : "/room-description";

      const method = isUpdateMode ? "put" : "post";

      const response = await api[method](endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update the user in localStorage with the new room details ID
      const updatedUser = { ...user, roomDetailsId: response.data._id };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success(
        isUpdateMode
          ? "Room details have been successfully updated! Your changes are now live."
          : "Room details have been successfully added! Your listing is now live."
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error.response?.data || error.message;
      toast.error(
        isUpdateMode
          ? `Failed to update room details: ${errorMessage}`
          : `Failed to add room details: ${errorMessage}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          {isUpdateMode ? "Update Room Details" : "Add Room Details"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-8 rounded-lg shadow"
        >
          {/* Rent Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rent*
            </label>
            <input
              type="range"
              min="0"
              max="2000"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              className="mt-1 w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>$0</span>
              <span>${rent}</span>
              <span>$2000</span>
            </div>
          </div>

          {/* Room Specifications */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Square Footage*
              </label>
              <input
                type="number"
                {...register("sqft", {
                  required: "Square footage is required",
                  min: { value: 1, message: "Must be greater than 0" },
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
              {errors.sqft && (
                <span className="text-red-500 text-sm">
                  {errors.sqft.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Floor Number*
              </label>
              <input
                type="number"
                {...register("floor", {
                  required: "Floor number is required",
                  min: { value: 0, message: "Must be 0 or greater" },
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
              {errors.floor && (
                <span className="text-red-500 text-sm">
                  {errors.floor.message}
                </span>
              )}
            </div>
          </div>

          {/* Room Counts */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Rooms*
              </label>
              <input
                type="number"
                {...register("rooms", {
                  required: "Number of rooms is required",
                  min: { value: 1, message: "Must have at least 1 room" },
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
              {errors.rooms && (
                <span className="text-red-500 text-sm">
                  {errors.rooms.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Bathrooms*
              </label>
              <input
                type="number"
                {...register("bath", {
                  required: "Number of bathrooms is required",
                  min: { value: 1, message: "Must have at least 1 bathroom" },
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
              {errors.bath && (
                <span className="text-red-500 text-sm">
                  {errors.bath.message}
                </span>
              )}
            </div>
          </div>

          {/* Location Details */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Street Name*
              </label>
              <input
                type="text"
                {...register("streetName", {
                  required: "Street name is required",
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
              {errors.streetName && (
                <span className="text-red-500 text-sm">
                  {errors.streetName.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Apartment Number*
              </label>
              <input
                type="text"
                {...register("apartmentNumber", {
                  required: "Apartment number is required",
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
              {errors.apartmentNumber && (
                <span className="text-red-500 text-sm">
                  {errors.apartmentNumber.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                City*
              </label>
              <input
                type="text"
                {...register("city", { required: "City is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
              {errors.city && (
                <span className="text-red-500 text-sm">
                  {errors.city.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Zipcode*
              </label>
              <input
                type="text"
                {...register("zipcode", {
                  required: "Zipcode is required",
                  pattern: {
                    value: /^\d{5}(-\d{4})?$/,
                    message: "Invalid zipcode format",
                  },
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
              {errors.zipcode && (
                <span className="text-red-500 text-sm">
                  {errors.zipcode.message}
                </span>
              )}
            </div>
          </div>

          {/* Room Type and Amenities */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Room Type*
              </label>
              <select
                {...register("roomType", { required: "Room type is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select room type</option>
                <option value="SHARED">Shared</option>
                <option value="PERSONAL">Personal</option>
              </select>
              {errors.roomType && (
                <span className="text-red-500 text-sm">
                  {errors.roomType.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Availability Date*
              </label>
              <input
                type="date"
                {...register("availabilityDate", {
                  required: "Availability date is required",
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison
                    return (
                      selectedDate >= today ||
                      "Availability date must be in the future"
                    );
                  },
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                min={new Date().toISOString().split("T")[0]} // Set minimum date to today
              />
              {errors.availabilityDate && (
                <span className="text-red-500 text-sm">
                  {errors.availabilityDate.message}
                </span>
              )}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("petFriendly")}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Pet Friendly</span>
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("patio")}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Has Patio</span>
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("washerDryer")}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Has Washer/Dryer</span>
              </label>
            </div>
          </div>

          {/* Additional Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Additional Amenities
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  AC Type*
                </label>
                <select
                  {...register("acType", { required: "AC type is required" })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">Select AC type</option>
                  <option value="CENTRALIZED">Centralized</option>
                  <option value="SEPARATE">Separate for each room</option>
                  <option value="NONE">No AC</option>
                </select>
                {errors.acType && (
                  <span className="text-red-500 text-sm">
                    {errors.acType.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stove Type*
                </label>
                <select
                  {...register("stoveType", {
                    required: "Stove type is required",
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">Select stove type</option>
                  <option value="FLAME">Flame</option>
                  <option value="ELECTRIC">Electric</option>
                  <option value="NONE">No Stove</option>
                </select>
                {errors.stoveType && (
                  <span className="text-red-500 text-sm">
                    {errors.stoveType.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("inHouseOven")}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">In-house Oven</span>
                </label>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("dishwasher")}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Dishwasher</span>
                </label>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("inHouseLaundry")}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    In-house Laundry
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("refrigerator")}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Refrigerator</span>
                </label>
              </div>
            </div>
          </div>

          {/* Room Photos Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Room Photos</h3>
            <p className="text-sm text-gray-500">
              Upload up to 5 photos of your room and society (Required*)
            </p>

            <div className="grid grid-cols-3 gap-4">
              {photoPreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Room preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}

              {photos.length < 5 && (
                <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400">
                  <FaCamera className="text-gray-400 text-2xl mb-2" />
                  <span className="text-sm text-gray-500">Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                    required={photos.length === 0}
                  />
                </label>
              )}
            </div>
            {errors.photos && (
              <span className="text-red-500 text-sm">
                At least one photo is required
              </span>
            )}
          </div>

          {/* Optional Descriptions */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Society Description
            </label>
            <textarea
              {...register("societyDescription")}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Additional Comments
            </label>
            <textarea
              {...register("comments")}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Save Room Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
