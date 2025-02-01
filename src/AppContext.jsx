import React, { createContext, useContext, useState } from "react";

// Create a context
const AppContext = createContext();

// Create a provider component
export function AppProvider({ children }) {
    const [filtersOn, setFiltersOn] = useState(false);
    const [viewObject, setViewObject] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [tableView, setTableView] = useState('normal');



  return (
    <AppContext.Provider value={{ filtersOn, setFiltersOn, viewObject, setViewObject, tableData, setTableData, tableView, setTableView }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useAppContext() {
  return useContext(AppContext);
}