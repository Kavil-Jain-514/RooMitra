import React, { createContext, useContext, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);

  const startLoading = () => {
    setLoadingCount((prev) => prev + 1);
    setLoading(true);
  };

  const stopLoading = () => {
    setLoadingCount((prev) => {
      const newCount = prev - 1;
      if (newCount === 0) {
        setLoading(false);
      }
      return newCount;
    });
  };

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading }}>
      {children}
      {loading && <LoadingSpinner />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
