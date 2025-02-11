import React, { useState, useEffect } from 'react';
import {
    Typography,
    CardContent,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { useAppContext } from '../../../AppContext';
import { Card } from '@shared-theme/customDesign';
import getLists from '@get/getLists';
import performCourseManagerAction from '@actions/courseManagerActions';
import { handleGetRowItem } from '@get/getObjects';


const CourseInfoTab = () => {
    const { viewObject, authStatus, setViewObject } = useAppContext();
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (authStatus === 'admin'){
            const getTeachers = async () => {
                const teachers = await getLists('teachers');
                setTeachers(teachers);
            }
            getTeachers();
        }}, []);

    const handleChangeTeacher = async() => {
        // Implement change teacher logic here
        await performCourseManagerAction({ action: 'add_teacher', course_id: viewObject.id, user_id: selectedTeacher });
        const newViewObject = await handleGetRowItem(viewObject, 'courses');
        setViewObject(newViewObject);
        setOpen(false);
    };

    return (
        <Card variant="outlined" sx={{ maxHeight: '500px', overflowY: 'auto' }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Course Information
                </Typography>
                <Typography variant="body1">
                    <strong>Teacher:</strong> {viewObject.teacher.full_name}
                </Typography>
                {authStatus === 'admin' && (
                    <div>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setOpen(true)}>
                            Change Teacher
                        </Button>
                        <Dialog open={open} onClose={() => setOpen(false)}>
                            <DialogTitle>Change Teacher</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Select a new teacher for this course.
                                </DialogContentText>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <InputLabel id="select-teacher-label">Teacher</InputLabel>
                                    <Select
                                        labelId="select-teacher-label"
                                        value={selectedTeacher}
                                        onChange={(e) => setSelectedTeacher(e.target.value)}
                                        label="Teacher"
                                    >
                                        {teachers.map((teacher) => (
                                            <MenuItem key={teacher.user_id} value={teacher.user_id}>
                                                {teacher.first_name} {teacher.last_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpen(false)} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleChangeTeacher} color="primary">
                                    Change
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )}
                <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Description:</strong> {viewObject.description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CourseInfoTab;