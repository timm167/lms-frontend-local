import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomContainer, Card } from '@shared-theme/customDesign';
import { useAppContext } from '../../AppContext';
import performCourseManagerAction from '@actions/courseManagerActions';
import ColorModeSelect from '@shared-theme/ColorModeSelect';
import { handleGetRowItem } from '@get/getObjects';

export default function CreateAssignment(props) {
    const [titleError, setTitleError] = React.useState(false);
    const [titleErrorMessage, setTitleErrorMessage] = React.useState('');
    const [descriptionError, setDescriptionError] = React.useState(false);
    const [descriptionErrorMessage, setDescriptionErrorMessage] = React.useState('');
    const [dueDateError, setDueDateError] = React.useState(false);
    const [dueDateErrorMessage, setDueDateErrorMessage] = React.useState('');
    const [maxScoreError, setMaxScoreError] = React.useState(false);
    const [maxScoreErrorMessage, setMaxScoreErrorMessage] = React.useState('');
    const [passScoreError, setPassScoreError] = React.useState(false);
    const [passScoreErrorMessage, setPassScoreErrorMessage] = React.useState('');
    const { setPage, viewObject, courseAddedTo, setViewObject } = useAppContext();

    function validateInputs() {
        let isValid = true;

        const title = document.getElementById('title').value;
        if (!title) {
            setTitleError(true);
            setTitleErrorMessage('Title is required');
            isValid = false;
        } else {
            setTitleError(false);
            setTitleErrorMessage('');
        }

        const description = document.getElementById('description').value;
        if (!description) {
            setDescriptionError(true);
            setDescriptionErrorMessage('Description is required');
            isValid = false;
        } else {
            setDescriptionError(false);
            setDescriptionErrorMessage('');
        }

        const dueDate = document.getElementById('due_date').value;
        if (!dueDate) {
            setDueDateError(true);
            setDueDateErrorMessage('Due date is required');
            isValid = false;
        } else {
            setDueDateError(false);
            setDueDateErrorMessage('');
        }

        const maxScore = document.getElementById('max_score').value;
        if (!maxScore) {
            setMaxScoreError(true);
            setMaxScoreErrorMessage('Max score is required');
            isValid = false;
        } else {
            setMaxScoreError(false);
            setMaxScoreErrorMessage('');
        }

        const passScore = document.getElementById('pass_score').value;
        if (!passScore) {
            setPassScoreError(true);
            setPassScoreErrorMessage('Pass score is required');
            isValid = false;
        } else {
            setPassScoreError(false);
            setPassScoreErrorMessage('');
        }

        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateInputs()) {
            return;
        }

        const data = new FormData(event.currentTarget);
        const assignmentData = {
            action: 'add_assignment',
            course_id: courseAddedTo,
            title: data.get('title'),
            description: data.get('description'),
            due_date: data.get('due_date'),
            max_score: parseInt(data.get('max_score'), 10),
            pass_score: parseInt(data.get('pass_score'), 10),
        };
        console.log(assignmentData);    
        const response = await performCourseManagerAction(assignmentData);
        const newViewObject = await handleGetRowItem(viewObject, 'courses');
        setViewObject(newViewObject);
        setPage('ObjectViewer');

        return response;
    };

    return (
        <CustomContainer
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ minHeight: '100vh', paddingTop: '2rem' }}
        >
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <Card variant="outlined" sx={{ position: 'relative', padding: 4, minHeight: '70vh', width: '100%', maxWidth: '500px', marginTop: '2rem' }}>
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
                    Assignments
                </Button>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', marginTop: '1.5rem', marginBottom: '1rem' }}
                >
                    Create Assignment
                </Typography>
                <Divider sx={{ marginBottom: '0.5rem' }} />
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: '1.5rem' }}
                >
                    <FormControl>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <TextField
                            required
                            fullWidth
                            name="title"
                            placeholder="Assignment Title"
                            id="title"
                            variant="outlined"
                            error={titleError}
                            helperText={titleErrorMessage}
                            color={titleError ? 'error' : 'primary'}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <TextField
                            required
                            fullWidth
                            name="description"
                            placeholder="Assignment Description"
                            id="description"
                            variant="outlined"
                            multiline
                            rows={4}
                            error={descriptionError}
                            helperText={descriptionErrorMessage}
                            color={descriptionError ? 'error' : 'primary'}
                        />
                    </FormControl>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <FormControl sx={{ flex: 1.5 }}>
                            <FormLabel htmlFor="due_date">Due Date</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="due_date"
                                type="date"
                                id="due_date"
                                variant="outlined"
                                error={dueDateError}
                                helperText={dueDateErrorMessage}
                                color={dueDateError ? 'error' : 'primary'}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>

                        <FormControl sx={{ flex: 1 }}>
                            <FormLabel htmlFor="max_score">Max Score</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="max_score"
                                placeholder="100"
                                id="max_score"
                                variant="outlined"
                                type="number"
                                error={maxScoreError}
                                helperText={maxScoreErrorMessage}
                                color={maxScoreError ? 'error' : 'primary'}
                            />
                        </FormControl>

                        <FormControl sx={{ flex: 1 }}>
                            <FormLabel htmlFor="pass_score">Pass Score</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="pass_score"
                                placeholder="60"
                                id="pass_score"
                                variant="outlined"
                                type="number"
                                error={passScoreError}
                                helperText={passScoreErrorMessage}
                                color={passScoreError ? 'error' : 'primary'}
                            />
                        </FormControl>
                    </Box>

                    <Divider sx={{ marginBottom: '0.2rem' }} />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Create Assignment
                    </Button>
                </Box>
            </Card>
        </CustomContainer>
    );
}