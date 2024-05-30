import React, { createContext, useContext, useState, ReactNode } from "react";
import Snackbar from "../components/Snackbar";

interface SnackbarContextType {
  showMessage: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const showMessage = (message: string) => {
    setMessage(message);
    setIsOpen(true);
  };

  const closeSnackbar = () => {
    setIsOpen(false);
    setMessage("");
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        message={message}
        isOpen={isOpen}
        closeSnackbar={closeSnackbar}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
