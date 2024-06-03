// SnackbarProvider.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import Snackbar from "../components/Snackbar";

interface SnackbarContextType {
  showMessage: (message: string, persist?: boolean) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [snackbarInfo, setSnackbarInfo] = useState({
    message: "",
    isOpen: false,
    persist: false,
  });

  const closeSnackbar = useCallback(() => {
    setSnackbarInfo((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const showMessage = useCallback((message: string, persist = false) => {
    setSnackbarInfo({ message, isOpen: true, persist });
  }, []);

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        message={snackbarInfo.message}
        isOpen={snackbarInfo.isOpen}
        closeSnackbar={closeSnackbar}
        persist={snackbarInfo.persist}
      />
    </SnackbarContext.Provider>
  );
};
