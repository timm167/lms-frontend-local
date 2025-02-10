import React, { createContext, useContext, useState } from "react";

// Create a context
const AppContext = createContext();

// Create a provider component
export function AppProvider({ children }) {
    const [filtersOn, setFiltersOn] = useState(false);
    const [viewObject, setViewObject] = useState(null);
    const [viewType, setViewType] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [tableView, setTableView] = useState('browse');
    const [page, setPage] = useState('login');
    const [loggedIn, setLoggedIn] = useState(false);
    const [authStatus, setAuthStatus] = useState('unauthorized');
    const [switchTable, setSwitchTable] = useState(null);
    const [courseAddedTo, setCourseAddedTo] = useState(null);
    const [lastViewObject, setLastViewObject] = useState(null);


  return (
    <AppContext.Provider 
    value={{ filtersOn, setFiltersOn, viewObject, 
      setViewObject, tableData, setTableData, tableView, setTableView,
    page, setPage, loggedIn, setLoggedIn, authStatus, setAuthStatus, 
    viewType, setViewType, switchTable, setSwitchTable, courseAddedTo,
    setCourseAddedTo, lastViewObject, setLastViewObject
     }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useAppContext() {
  return useContext(AppContext);
}