import React from "react";
import { Controller } from "react-hook-form";

const PhoneNumberInput = ({ control, error }) => {
  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  return (
    <Controller
      name="phoneNumber"
      control={control}
      rules={{
        required: "Phone number is required",
        pattern: {
          value: /^\(\d{3}\) \d{3}-\d{4}$/,
          message: "Invalid phone number format",
        },
      }}
      render={({ field: { onChange, value } }) => (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value);
            onChange(formatted);
          }}
          placeholder="(555) 555-5555"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          maxLength={14}
        />
      )}
    />
  );
};

export default PhoneNumberInput;
