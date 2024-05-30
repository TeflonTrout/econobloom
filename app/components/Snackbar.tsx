"use client";
import React, { useState, useEffect } from "react";

interface SnackbarProps {
  message: string;
  isOpen: boolean;
  closeSnackbar: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  isOpen,
  closeSnackbar,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        closeSnackbar();
      }, 3000); // The snackbar will disappear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen, closeSnackbar]);

  return (
    <div
      className={`${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } transition transform ease-out duration-300 fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-md bg-black text-white shadow-lg`}
    >
      {message}
    </div>
  );
};

export default Snackbar;
