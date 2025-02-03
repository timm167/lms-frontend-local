import React, { useState } from 'react';
import StudentsTable from "@tables/StudentsTable";
import CoursesTable from "@tables/CoursesTable";
import UsersTable from "@tables/UsersTable";
import TeachersTable from "@tables/TeachersTable";
import EnrollmentsTable from "@tables/EnrollmentsTable";
import AdminsTable from "@tables/AdminsTable";
import getLists from '@get/getLists';
import handleLogin from '@accounts/handleLogin';
import handleLogout from '@accounts/handleLogout';
import { handleClear, handleGenerate } from '@service/new_data_set';
import { useAppContext } from '@/AppContext';
import '@css/playground.css';


const tableComponents = {
    students: StudentsTable,
    courses: CoursesTable,
    users: UsersTable,
    teachers: TeachersTable,
    enrollments: EnrollmentsTable,
    admins: AdminsTable,
};

// ----------------------------------------
// Playground Component
// ----------------------------------------

const Playground = () => {

    // ----------------------------------------
    // State
    // ----------------------------------------

    const [currentTable, setCurrentTable] = useState(null);
    const [permissionDenied, setPermissionDenied] = useState(false);
    const { filtersOn, 
        setFiltersOn, 
        tableData, 
        setTableData, 
        tableView, 
        setTableView, 
        setPage, 
        authStatus,
        setAuthStatus } = useAppContext();

    const toggleView = () => {
        const newView = tableView === 'normal' ? 'browse' : 'normal';
        setTableView(newView);
        if (currentTable) {
            handleTableSelection(currentTable, newView);
        }
    };

    // ----------------------------------------
    // Handlers
    // ----------------------------------------

    const handleTableSelection = async (table, declaredView=null) => {
        if (!declaredView) {
            declaredView = tableView
        }
        table = table.toLowerCase();
        try {
            const data = await getLists(table, declaredView);
            setTableData(data);
            setCurrentTable(table);
            setPermissionDenied(false);
        } catch (error) {
            setPermissionDenied(true);
            setCurrentTable(null);
            if (error.response && error.response.status === 403) {
                alert("Access denied. You do not have permission to view this data.");
            } else {
                console.error("Error fetching table data:", error);
            }
        }
        
    };

    const handleAuthAction = (action) => {
        resetTables();
        if (action === 'unauthorized') {
            handleLogout();
            setAuthStatus(action);
            return;
        }
        setAuthStatus(action);
        const email = `${action}@${action}.com`;
        try {
            handleLogin(action, action, action, email, action, action);
            setAuthStatus(action);
            
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed. Please try again.");
        }
    };

    const TableComponent = tableComponents[currentTable] || null;

    const resetTables = () => {
        setTableData([]);
        setCurrentTable(null);
        setPermissionDenied(false);
    }



    // ----------------------------------------
    // Render
    // ----------------------------------------

    return (

        <div className="playground">
            <h2 className={permissionDenied ? 'red' : 'green'}>{permissionDenied ? 'Permission Denied' : 'Everything is okay!'}</h2>
            <div className="row">
                <button className="clear action-button" onClick={() => handleClear()}>
                    Clear Data 
                </button>
                <button className="generate action-button" onClick={() => handleGenerate()}>
                    Generate Data
                </button>
            </div>
            <div className='auth section'>
            <h2 className="auth-status">Currently Authorized as: <span className={authStatus}>{authStatus.charAt(0).toUpperCase() + authStatus.slice(1)}</span></h2>
                <div className="row">
                    {['student', 'teacher', 'admin', 'unauthorized'].map((action) => (
                        <button key={action} className="auth-button" onClick={() => handleAuthAction(action)}>
                            Authorize as {action.charAt(0).toUpperCase() + action.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            <div className='s-tables section'>
                <h2>Tables</h2>
                <div className="row">
                    <button className="reset action-button" onClick={() => resetTables()}>Reset Tables</button>
                    <button className="view action-button" onClick={() => toggleView()}>Table View: {tableView.charAt(0).toUpperCase() + tableView.slice(1)}</button>
                </div>
                <div className="row">
                    {['Users', 'Students', 'Teachers', 'Admins', 'Courses', 'Enrollments'].map((table) => (
                        <button key={table} className="table-button" onClick={() => handleTableSelection(table)}>
                            {table}
                        </button>
                    ))}
                    
                    <button className='table-button filters' onClick={() => setFiltersOn(!filtersOn)}>
                        {filtersOn ? 'Filters Are On' : 'Filters Are Off'}
                    </button>
                    <div className={TableComponent ? 'table-display' : ''}>

                        {TableComponent && <TableComponent data={tableData}/>}
                    </div>
                </div>
            </div>
            
            <div className='actions section'>
                <h2>Actions</h2>
                <div className="row">
                    <button type="submit" className='go-to-form action-button' onClick={() => setPage('AddUser')}>Add User</button>

                    <button type="submit" className='go-to-form action-button' onClick={() => setPage('CreateCourse')}>Add Course</button>
                </div>
            </div>
        </div>
    );
};

export default Playground;