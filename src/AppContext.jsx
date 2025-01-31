import React, { createContext, useContext, useState } from "react";

// Create a context
const AppContext = createContext();

// Create a provider component
export function AppProvider({ children }) {
    const [filtersOn, setFiltersOn] = useState(false);
    const [viewObject, setViewObject] = useState(null);


  return (
    <AppContext.Provider value={{ filtersOn, setFiltersOn, viewObject, setViewObject }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useAppContext() {
  return useContext(AppContext);
}