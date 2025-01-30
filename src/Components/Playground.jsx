import React, { useState, useEffect } from 'react';
import StudentsTable from "./tables/Students";
import CoursesTable from "./tables/Courses";
import UsersTable from "./tables/Users";
import TeachersTable from "./tables/Teachers";
import EnrollmentsTable from "./tables/Enrollments";
import AdminsTable from "./tables/Admins";
import getLists from '../service/tables/getLists';
import handleLogin from '../service/accounts/handleLogin';
import handleLogout from '../service/accounts/handleLogout';
import { handleClear, handleGenerate } from '../service/new_data_set';
import './css/playground.css';

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
    const [tableData, setTableData] = useState([]);
    const [userData, setUserData] = useState({ username: '', email: '' });
    const [courseData, setCourseData] = useState({ courseName: '', courseDescription: '' });
    const [authStatus, setAuthStatus] = useState('select an option');
    const [tableView, setTableView] = useState('normal');
    const [permissionDenied, setPermissionDenied] = useState(false);

    // useEffect(() => {
    //     console.log("currentTable: ", currentTable);    
    // })
    // ----------------------------------------
    // Handlers
    // ----------------------------------------

    const handleTableSelection = async (table) => {
        table = table.toLowerCase();
        
        if (currentTable !== table) {
            
            try {
                const data = await getLists(table, tableView);
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
        }
    };

    const handleUserInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleCourseInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleUserSubmit = (e) => {
        e.preventDefault();
        console.log("Adding user: ", userData);
        // Handle user creation logic (like API call)
    };

    const handleCourseSubmit = (e) => {
        e.preventDefault();
        console.log("Adding course: ", courseData);
        // Handle course creation logic (like API call)
    };

    const handleAuthAction = (action) => {
        resetTables();
        if (action === 'unauthorized') {
            handleLogout();
            setAuthStatus(action);
            return;
        }
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

    const toggleView = () => {
        console.log("Current Table: ", currentTable);
        if (authStatus === 'student' && currentTable == 'courses') {
            if (tableView === 'browse') {
                setPermissionDenied(true);
                console.log("Cannot view this table outside of browse mode");
                return;
            }
            else {
                console.log("Toggling view mode");
                setTableView('browse');
                setPermissionDenied(false);
                handleTableSelection(currentTable); 
            }

        }
        setTableView(tableView === 'normal' ? 'browse' : 'normal')
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
                    <button className="action-button" onClick={() => resetTables()}>Toggle Tables</button>
                    <button className="action-button" onClick={() => toggleView()}>Current View Mode: '{tableView.charAt(0).toUpperCase() + tableView.slice(1)}'</button>
                </div>
                <div className="row">
                    {['Users', 'Students', 'Teachers', 'Admins', 'Courses', 'Enrollments'].map((table) => (
                        <button key={table} className="table-button" onClick={() => handleTableSelection(table)}>
                            {table}
                        </button>
                    ))}

                <div className="table-display">
                    {TableComponent && <TableComponent data={tableData} tableView={tableView} />}
                </div>
                </div>
            </div>
            
            <div className='actions section'>
                <h2>Actions</h2>
                <div className="forms">
                    <form className="user-form" onSubmit={handleUserSubmit}>
                        <h4>Add User</h4>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={userData.username}
                            onChange={handleUserInputChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={handleUserInputChange}
                        />
                        <button type="submit">Add User</button>
                    </form>

                    <form className="course-form" onSubmit={handleCourseSubmit}>
                        <h4>Add Course</h4>
                        <input
                            type="text"
                            name="courseName"
                            placeholder="Course Name"
                            value={courseData.courseName}
                            onChange={handleCourseInputChange}
                        />
                        <textarea
                            name="courseDescription"
                            placeholder="Course Description"
                            value={courseData.courseDescription}
                            onChange={handleCourseInputChange}
                        />
                        <button type="submit">Add Course</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Playground;