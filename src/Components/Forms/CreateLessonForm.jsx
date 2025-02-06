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

export default function CreateLesson(props) {
    const [titleError, setTitleError] = React.useState(false);
    const [titleErrorMessage, setTitleErrorMessage] = React.useState('');
    const [contentError, setContentError] = React.useState(false);
    const [contentErrorMessage, setContentErrorMessage] = React.useState('');
    const [videoUrlError, setVideoUrlError] = React.useState(false);
    const [videoUrlErrorMessage, setVideoUrlErrorMessage] = React.useState('');
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

        const content = document.getElementById('content').value;
        if (!content) {
            setContentError(true);
            setContentErrorMessage('Content is required');
            isValid = false;
        } else {
            setContentError(false);
            setContentErrorMessage('');
        }

        const videoUrl = document.getElementById('video_url').value;
        if (videoUrl && !isValidUrl(videoUrl)) {
            setVideoUrlError(true);
            setVideoUrlErrorMessage('Invalid URL');
            isValid = false;
        } else {
            setVideoUrlError(false);
            setVideoUrlErrorMessage('');
        }

        return isValid;
    }

    function isValidUrl(url) {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(url);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateInputs()) {
            return;
        }

        const data = new FormData(event.currentTarget);
        const lessonData = {
            action: 'add_lesson',
            course_id: courseAddedTo,
            title: data.get('title'),
            content: data.get('content'),
            video_url: data.get('video_url'),
        };
        console.log(lessonData);
        const response = await performCourseManagerAction(lessonData);
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
                    Lessons
                </Button>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', marginTop: '1.5rem', marginBottom: '1rem' }}
                >
                    Create Lesson
                </Typography>
                <Divider sx={{ marginBottom: '1.5rem' }} />
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
                            placeholder="Lesson Title"
                            id="title"
                            variant="outlined"
                            error={titleError}
                            helperText={titleErrorMessage}
                            color={titleError ? 'error' : 'primary'}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="content">Content</FormLabel>
                        <TextField
                            required
                            fullWidth
                            name="content"
                            placeholder="Lesson Content"
                            id="content"
                            variant="outlined"
                            multiline
                            rows={4}
                            error={contentError}
                            helperText={contentErrorMessage}
                            color={contentError ? 'error' : 'primary'}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="video_url">Video URL</FormLabel>
                        <TextField
                            fullWidth
                            name="video_url"
                            placeholder="Video URL"
                            id="video_url"
                            variant="outlined"
                            error={videoUrlError}
                            helperText={videoUrlErrorMessage}
                            color={videoUrlError ? 'error' : 'primary'}
                        />
                    </FormControl>

                    <Divider sx={{ marginBottom: '1rem' }} />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Create Lesson
                    </Button>
                </Box>
            </Card>
        </CustomContainer>
    );
}
