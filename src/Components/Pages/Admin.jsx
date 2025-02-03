import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, MenuItem, Select, FormControl, InputLabel, Divider } from '@mui/material';
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

const tableComponents = {
    students: StudentsTable,
    courses: CoursesTable,
    users: UsersTable,
    teachers: TeachersTable,
    enrollments: EnrollmentsTable,
    admins: AdminsTable,
};

const Admin = () => {
    const [currentTable, setCurrentTable] = useState(null);
    const { filtersOn, setFiltersOn, tableData, setTableData, tableView, setTableView, setPage } = useAppContext();

    const handleTableSelection = async (table) => {
        table = table.toLowerCase();
        try {
            setTableView('normal');
            const data = await getLists(table, tableView);
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

    return (
        <CustomContainer
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ minHeight: '100vh', paddingTop: '2rem'}}
        >
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <Card variant="outlined" sx={{ position: 'relative', padding: 4,  minHeight: '70vh', width: 'fit-content', marginTop: '2rem', maxHeight: '80vh', overflow: 'auto' }}> {/* Adjust card height and width */}
                <CardContent sx={{paddingLeft: 14, paddingRight: 14}}>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', marginBottom: '1.5rem' }} // Add margin bottom
                    >
                        Admin Dashboard
                    </Typography>
                    <Box className='actions section'>
                        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Actions</Typography>
                        <Box className="row" sx={{ display: 'flex', gap: 1, flexDirection: 'row', width: '100%' }}>
                            <Button variant="contained" color="primary" onClick={() => setPage('AddUser')} sx={{ flexGrow: 1 }}>Add User</Button>
                            <Button variant="contained" color="primary" onClick={() => setPage('CreateCourse')} sx={{ flexGrow: 1 }}>Add Course</Button>
                        </Box>
                    </Box>
                    <Divider sx={{ margin: '1.5rem 0' }} />
                    <Box className="row" sx={{ display: 'flex', gap: 1, flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                        {['Users', 'Students', 'Teachers', 'Admins', 'Courses', 'Enrollments'].map((table) => (
                            <Button key={table} variant="outlined" onClick={() => handleTableSelection(table)} sx={{ flexGrow: 1 }}>
                                {table}
                            </Button>
                        ))}
                        <Button variant="outlined" onClick={() => setFiltersOn(!filtersOn)} sx={{ flexGrow: 1 }}>
                            {filtersOn ? 'Filters Are On' : 'Filters Are Off'}
                        </Button>
                    </Box>
                </CardContent>
                <Divider/>
                {TableComponent && <TableComponent data={tableData} />}
            </Card>
        </CustomContainer>
    );
};


export default Admin;

