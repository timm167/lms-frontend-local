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


function StudentsTab() {
    const { viewObject, authStatus, setViewObject } = useAppContext();
    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (authStatus === 'admin'){
            const getStudents = async () => {
                const students = await getLists('students');
                setStudents(students);
            }
            getStudents();
        }}, []);

    const handleRemoveStudent = async(studentId) => {
        await performCourseManagerAction({ action: 'unenroll_student', course_id: viewObject.id, user_id: studentId });
        const newViewObject = await handleGetRowItem(viewObject, 'courses');
        setViewObject(newViewObject);
        setOpen(false);
    };

    const handleAddStudent = async(studentId) => {
        await performCourseManagerAction({ action: 'enroll_student', course_id: viewObject.id, user_id: studentId });
        const newViewObject = await handleGetRowItem(viewObject, 'courses');
        setViewObject(newViewObject);
        setOpen(false);
    };



    return (
    <Card variant="outlined">
        <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Students
            </Typography>
            <List>
                {viewObject.students.map((student) => (
                    <ListItem key={student.user_id}>
                        <ListItemText primary={student.full_name} />
                        {authStatus === 'admin' && (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleRemoveStudent(student.user_id)}
                            >
                                Remove
                            </Button>
                        )}
                    </ListItem>
                ))}
            </List>
            {authStatus === 'admin' && (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={() => setOpen(true)}
                    >
                        Add Student
                    </Button>
                    <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogTitle>Add Student</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Select a student to add to this course.
                            </DialogContentText>
                            <List>
                                {students.filter(
                                        (student) =>
                                            !viewObject.students.some(
                                                (s) => s.user_id === student.user_id
                                            )
                                    )
                                    .map((student) => (
                                        <ListItem
                                            button
                                            key={student.user_id}
                                            onClick={() => handleAddStudent(student.user_id)}
                                        >
                                            <ListItemText primary={`${student.first_name} ${student.last_name}`} />
                                        </ListItem>
                                    ))}
                            </List>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </CardContent>
    </Card>
    )
}

export default StudentsTab;