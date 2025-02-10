import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Card, CardContent, Divider } from '@mui/material';
import StudentsTable from "@tables/StudentsTable";
import CoursesTable from "@tables/CoursesTable";
import UsersTable from "@tables/UsersTable";
import TeachersTable from "@tables/TeachersTable";
import EnrollmentsTable from "@tables/EnrollmentsTable";
import AdminsTable from "@tables/AdminsTable";
import getLists from '@get/getLists';
import { useAppContext } from '@/AppContext';
import { CustomContainer } from '@shared-theme/customDesign';
import ColorModeSelect from '@shared-theme/ColorModeSelect';
import '@css/playground.css';
import Admin from './Admin';

const tableComponents = {
    students: StudentsTable,
    courses: CoursesTable,
    users: UsersTable,
    teachers: TeachersTable,
    enrollments: EnrollmentsTable,
    admins: AdminsTable,
};

const Home = () => {
    const [currentTable, setCurrentTable] = useState(null);
    const { filtersOn, setFiltersOn, tableData, setTableData, tableView, setTableView, setPage, authStatus, switchTable, setSwitchTable } = useAppContext();

    useEffect(() => {
        if (switchTable == 'myCourses' && authStatus == 'student')
            {handleTableSelection('enrollments')}
        setSwitchTable(null);
    }, [switchTable]);

    const handleTableSelection = async (table, declaredView='normal') => {
        table = table.toLowerCase();
        try {
            setTableView(declaredView);
            const data = await getLists(table, declaredView);
            setTableData(data);
            setCurrentTable(table);
        } catch (error) {
            setCurrentTable(null);
            if (error.response && error.response.status === 403) {
                alert("Access denied. You do not have permission to view this data.");
            } else {
                console.error("Error fetching table data:", error);
            }
        }
    };

    const TableComponent = currentTable ? tableComponents[currentTable] : null;
    if (authStatus == 'admin') {
        return <Admin/>
    }

    return (
        <CustomContainer
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ minHeight: '100vh', paddingTop: '2rem'}}
        >
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <Card variant="outlined" sx={{ position: 'relative', padding:4, minHeight: '70vh', width: 'fit-content', marginTop: '2rem', maxHeight: '80vh', overflow: 'auto' }}> {/* Adjust card height and width */}
                <CardContent sx={{paddingLeft: 19, paddingRight: 19}}>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', marginBottom: '1.5rem' }} // Add margin bottom
                    >
                        Learning Management System
                    </Typography>
                    <Divider sx={{ margin: '1.5rem 0' }} />
                    <Box className="row" sx={{ display: 'flex', gap: 1, flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                        <Button variant="outlined" onClick={() => handleTableSelection('Courses', 'browse')} sx={{ flexGrow: 1 }}>
                            Browse Courses
                        </Button>
                        {authStatus == 'teacher' && 
                        <Button variant="outlined" onClick={() => handleTableSelection('Courses')} sx={{ flexGrow: 1 }}>
                            My Courses
                        </Button>}
                        {authStatus == 'student' && 
                        <Button variant="outlined" onClick={() => handleTableSelection('Enrollments')} sx={{ flexGrow: 1 }}>
                            My Courses
                        </Button>}
                        <Button variant="outlined" onClick={() => setFiltersOn(!filtersOn)} sx={{ flexGrow: 1 }}>
                            {filtersOn ? 'Filters Are On' : 'Filters Are Off'}
                        </Button>
                        {authStatus == 'teacher' && 
                        <Button variant="contained" color="primary" onClick={() => setPage('CreateCourse')} sx={{ flexGrow: 1 }}>
                            Add Course
                        </Button>}
                    </Box>
                </CardContent>
                <Divider/>
                {TableComponent && <TableComponent data={tableData} />}
            </Card>
        </CustomContainer>
    );
};


export default Home
