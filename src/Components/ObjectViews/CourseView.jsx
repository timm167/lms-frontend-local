import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
} from '@mui/material';
import { useAppContext } from '../../AppContext';
import { CustomContainer} from '@shared-theme/customDesign';
import StudentsTab from './Tabs/StudentsTab';
import AssignmentsTab from './Tabs/AssignmentsTab';
import CourseInfoTab from './Tabs/CourseInfoTab';
import LessonsTab from './Tabs/LessonsTab';


function CourseView() {
    const [activeTab, setActiveTab] = useState('info');
    const { viewObject} = useAppContext();

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };


    return (
        <CustomContainer>
            <Box sx={{ width: '100%', fontSize: '1.5rem', position: 'relative', paddingTop: '50px' }}>

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