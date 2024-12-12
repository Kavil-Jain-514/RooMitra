import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import PhoneNumberInput from "../components/PhoneNumberInput";

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm();
  const [nationalities, setNationalities] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || "RoomSeeker";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nationalitiesRes, occupationsRes] = await Promise.all([
          api.get("nationalities"),
          api.get("occupations"),
        ]);
        setNationalities(nationalitiesRes.data);
        setOccupations(occupationsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load form data");
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const endpoint =
        userType === "RoomSeeker"
          ? "/users/register/seeker"
          : "/users/register/provider";

      const registrationData = {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
        userType: userType,
      };

      const response = await api.post(endpoint, registrationData);

      if (response.status === 200) {
        toast.success("Registration successful!");
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response?.data?.message === "Email already exists") {
        setError("email", {
          type: "manual",
          message: "This email is already registered",
        });
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          {userType === "RoomSeeker"
            ? "RoomSeeker Registration"
            : "RoomProvider Registration"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: "First name is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: "Last name is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Date of Birth</label>
            <input
              type="date"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
                validate: (value) => {
                  const date = new Date(value);
                  const today = new Date();
                  return (
                    date <= today || "Date of birth cannot be in the future"
                  );
                },
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              max={new Date().toISOString().split("T")[0]}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500">{errors.dateOfBirth.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <PhoneNumberInput control={control} error={errors.phoneNumber} />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Gender</label>
            <select
              {...register("gender")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Transgender">Transgender</option>
              <option value="Non_binary">Non-binary</option>
              <option value="None">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Nationality</label>
            <select
              {...register("nationalityId", {
                required: "Nationality is required",
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select your nationality</option>
              {nationalities.map((nat) => (
                <option key={nat._id} value={nat._id}>
                  {nat.nationalityName}
                </option>
              ))}
            </select>
            {errors.nationalityId && (
              <p className="text-red-500">{errors.nationalityId.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Occupation</label>
            <select
              {...register("occupationId", {
                required: "Occupation is required",
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select your occupation</option>
              {occupations.map((occ) => (
                <option key={occ._id} value={occ._id}>
                  {occ.occupationName}
                </option>
              ))}
            </select>
            {errors.occupationId && (
              <p className="text-red-500">{errors.occupationId.message}</p>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${
                isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white py-2 px-4 rounded-md shadow-md transition duration-300`}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
          <input type="hidden" value={userType} {...register("userType")} />
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
