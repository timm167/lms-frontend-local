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
import getLists from '@get/getLists';
import performCourseManagerAction from '@actions/courseManagerActions';
import { handleGetRowItem } from '@get/getObjects';



function AssignmentsTab() {
    const { viewObject, authStatus, setViewObject } = useAppContext();


    const handleDeleteAssignment = (assignmentId) => {
        // Implement delete assignment logic here
        console.log(`Delete assignment with ID: ${assignmentId}`);
    };

    const handleSetAssignment = () => {
        // Implement set assignment logic here
        console.log('Set assignment');
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
                    <ListItemText primary={assignment.title} />
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