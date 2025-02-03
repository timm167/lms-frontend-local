import React, { useState, useEffect } from 'react';
import {
    Typography,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { useAppContext } from '../../../AppContext';
import { Card } from '@shared-theme/customDesign';
import getLists from '@get/getLists';
import performCourseManagerAction from '@actions/courseManagerActions';
import { handleGetRowItem } from '@get/getObjects';


function LessonsTab() {
    const { viewObject, authStatus, setViewObject } = useAppContext();

    const handleDeleteLesson = (lessonId) => {
        // Implement delete lesson logic here
        console.log(`Delete lesson with ID: ${lessonId}`);
    };

    const handleAddLesson = () => {
        // Implement add lesson logic here
        console.log('Add lesson');
    }

  return (
<Card variant="outlined">
        <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Lessons
            </Typography>
            <List>
                {viewObject.lessons.map((lesson) => (
                    <ListItem key={lesson.id}>
                        <ListItemText primary={lesson.title} />
                        {authStatus !== 'student' && (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleDeleteLesson(lesson.id)}
                            >
                                Delete
                            </Button>
                        )}
                    </ListItem>
                ))}
            </List>
            {authStatus !== 'student' && (
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Create Lesson
                </Button>
            )}
        </CardContent>
    </Card>
  );
}

export default LessonsTab;