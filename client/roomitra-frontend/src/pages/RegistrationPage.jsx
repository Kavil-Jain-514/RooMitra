import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [nationalities, setNationalities] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || "RoomSeeker";

  useEffect(() => {
    // Fetch nationalities and occupations from the backend
    api
      .get("nationalities")
      .then((response) => {
        setNationalities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching nationalities:", error);
      });

    api
      .get("occupations")
      .then((response) => {
        setOccupations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching occupations:", error);
      });
  }, []);

  const onSubmit = (data) => {
    // Set the userType based on the selected option
    data.userType = userType === "roomSeeker" ? "RoomSeeker" : "RoomProvider";
    console.log("Submitting form data:", data);

    // Determine the API endpoint based on userType
    const apiEndpoint =
      userType === "roomSeeker"
        ? "users/register/seeker"
        : "users/register/provider";

    // Submit the form data to the backend
    api
      .post(apiEndpoint, data)
      .then((response) => {
        console.log("User registered:", response.data);
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        toast.error("Registration failed. Please try again.");
      });
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
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500">{errors.dateOfBirth.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number",
                },
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
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
                <option key={nat.id} value={nat.id}>
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
                <option key={occ.id} value={occ.id}>
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
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </div>
          <input type="hidden" value={userType} {...register("userType")} />
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
