import React, { useState, useEffect } from 'react';
import {
    Typography,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Button,
} from '@mui/material';
import { useAppContext } from '../../../AppContext';
import { Card } from '@shared-theme/customDesign';
import performCourseManagerAction from '@actions/courseManagerActions';
import { handleGetRowItem } from '@get/getObjects';



function AssignmentsTab() {
    const { viewObject, authStatus, setViewObject, setPage, setCourseAddedTo, setViewType } = useAppContext();

    const handleDeleteAssignment = async (assignmentId) => {
        await performCourseManagerAction({ action: 'delete_assignment', item_id: assignmentId, course_id: viewObject.id });
        const newViewObject = await handleGetRowItem(viewObject, 'courses');
        setViewObject(newViewObject);
    };


    const handleSetAssignment = () => {
        setCourseAddedTo(viewObject.id);
        setPage('CreateAssignment');
    }

        
    const handleViewAssignment = async (assignment) => {
        const newViewObject = await handleGetRowItem(assignment, 'assignments');
        await setViewObject(newViewObject);
        await setViewType('assignments');
        setPage('ObjectViewer')
    }

  return (
    <Card variant="outlined">
    <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
            Assignments
        </Typography>
        <List>
            {viewObject.assignments.map((assignment) => (
                <ListItem key={assignment.id}>
                    <ListItemText primary={assignment.title} sx={{ ":hover": { cursor: 'pointer', textDecoration: 'underline', color: 'blue' }  }} 
                    onClick={() => handleViewAssignment(assignment)}
                    />
                    {authStatus !== 'student' && (
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDeleteAssignment(assignment.id)}
                        >
                            Delete
                        </Button>
                    )}
                </ListItem>
            ))}
        </List>
        {authStatus !== 'student' && (
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleSetAssignment()}>
                Set Assignment
            </Button>
        )}
    </CardContent>
</Card>
  );
}

export default AssignmentsTab;