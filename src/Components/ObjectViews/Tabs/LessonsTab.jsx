import React, { useState, useEffect, Component } from 'react';
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
import {handleGetRowItem} from '@get/getObjects';
import performCourseManagerAction from '@actions/courseManagerActions';


function LessonsTab() {
    const { viewObject, authStatus, setViewObject, setPage, setCourseAddedTo, setViewType } = useAppContext();

    const handleDeleteLesson = async (lessonId) => {
        await performCourseManagerAction({ action: 'delete_lesson', item_id: lessonId, course_id: viewObject.id });
        const newViewObject = await handleGetRowItem(viewObject, 'courses');
        setViewObject(newViewObject);
    };

    const handleAddLesson = () => {
        setCourseAddedTo(viewObject.id);
        setPage('CreateLesson');
    }

    const handleViewLesson = async (lesson) => {
        const newViewObject = await handleGetRowItem(lesson, 'lessons');
        await setViewObject(newViewObject);
        await setViewType('lessons');
        setPage('ObjectViewer')
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
                        <ListItemText primary={lesson.title} sx={{ ":hover": { cursor: 'pointer', textDecoration: 'underline', color: 'blue' }  }} 
                        onClick={() => handleViewLesson(lesson)}
                        />                        
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
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleAddLesson()}>
                    Create Lesson
                </Button>
            )}
        </CardContent>
    </Card>
  );
}

export default LessonsTab;