"use client";
import React, { useEffect } from "react";

interface SnackbarProps {
  message: string;
  isOpen: boolean;
  closeSnackbar: () => void;
  persist: boolean; // New prop to determine if the snackbar should persist
}

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  isOpen,
  closeSnackbar,
  persist,
}) => {
  useEffect(() => {
    if (isOpen && !persist) {
      const timer = setTimeout(() => {
        closeSnackbar();
      }, 5000); // Adjust time as necessary
      return () => clearTimeout(timer);
    }
  }, [isOpen, closeSnackbar, persist]);

  return (
    <div
      className={`${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } transition transform ease-out duration-300 fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-md bg-black text-white shadow-lg`}
    >
      {message}
      {persist && (
        <button
          onClick={closeSnackbar}
          className="absolute top-1 right-2 text-lg"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Snackbar;
