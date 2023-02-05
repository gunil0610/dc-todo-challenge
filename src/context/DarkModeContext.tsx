import React, { createContext, useContext, useMemo, useState } from "react";

interface DarkModeContextValueType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<
  DarkModeContextValueType | undefined
>(undefined);

export const DarkModeProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode((mode) => !mode);

  const contextValue = useMemo(
    () => ({ darkMode, toggleDarkMode }),
    [darkMode]
  );

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeContext");
  }
  return context;
};
