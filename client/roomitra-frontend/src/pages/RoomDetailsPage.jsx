import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { toast } from "react-hot-toast";

const RoomDetailsPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const onSubmit = async (data) => {
    try {
      const roomData = {
        providerId: user._id,
        ...data,
      };

      await api.post("/room-description", roomData);
      toast.success("Room details added successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error adding room details");
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Add Room Details
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-8 rounded-lg shadow"
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Square Footage
              </label>
              <input
                type="number"
                {...register("sqft", { required: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Rooms
              </label>
              <input
                type="number"
                {...register("rooms", { required: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Bathrooms
              </label>
              <input
                type="number"
                {...register("bath", { required: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Bedrooms
              </label>
              <input
                type="number"
                {...register("bed", { required: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Has Patio?
              </label>
              <input type="checkbox" {...register("patio")} className="mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Has Washer/Dryer?
              </label>
              <input
                type="checkbox"
                {...register("washerDryer")}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stovetop Type
            </label>
            <select
              {...register("stovetop", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            >
              <option value="GAS">Gas</option>
              <option value="ELECTRIC">Electric</option>
            </select>
          </div>

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
