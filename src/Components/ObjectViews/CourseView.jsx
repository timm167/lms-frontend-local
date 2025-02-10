import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Button,
} from '@mui/material';
import { useAppContext } from '../../AppContext';
import { CustomContainer} from '@shared-theme/customDesign';
import StudentsTab from './Tabs/StudentsTab';
import AssignmentsTab from './Tabs/AssignmentsTab';
import CourseInfoTab from './Tabs/CourseInfoTab';
import LessonsTab from './Tabs/LessonsTab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function CourseView() {
    const [activeTab, setActiveTab] = useState('info');
    const { viewObject, setPage, setLastViewObject } = useAppContext();

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    useEffect(() => {setLastViewObject(viewObject)}, []);

    return (
        <CustomContainer>
            <Box sx={{ width: '100%', fontSize: '2rem', position: 'relative', paddingTop: '50px' }}>
                <Button
                    variant="text"
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        position: 'absolute',
                        top: 21,
                        left: 20,
                        zIndex: 1,
                        fontSize: '0.7rem',
                    }}
                    onClick={() => setPage('Home')}
                >
                    Home
                </Button>
                {/* Course Header */}
                <Typography variant="h4" sx={{ mb: 2, color: 'black' }}>
                    {viewObject.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 4, color: 'black' }}>
                    {viewObject.description}
                </Typography>
    
                {/* Tabs for Navigation */}
                <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
                    <Tab label="Course Info" value="info" sx={{ '&:focus': { outline: 'none' } }} />
                    <Tab label="Lessons" value="lessons" sx={{ '&:focus': { outline: 'none' } }} />
                    <Tab label="Assignments" value="assignments" sx={{ '&:focus': { outline: 'none' } }} />
                    <Tab label="Students" value="students" sx={{ '&:focus': { outline: 'none' } }} />
                </Tabs>
    
                {activeTab === 'info' && (
                    <CourseInfoTab/>
                )}
    
                {/* Lessons Tab */}
                {activeTab === 'lessons' && (
                    <LessonsTab/>
                )}
    
                {/* Assignments Tab */}
                {activeTab === 'assignments' && (
                    <AssignmentsTab/>
                )}
    
                {/* Students Tab */}
                {activeTab === 'students' && (
                    <StudentsTab/>
                )}
            </Box>
        </CustomContainer>
    );
}

export default CourseView;