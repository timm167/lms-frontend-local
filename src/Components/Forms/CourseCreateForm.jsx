import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Select, MenuItem } from '@mui/material';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {CustomContainer, Card} from '@shared-theme/customDesign';
import { useAppContext } from '../../AppContext'; 
import getLists from '@get/getLists';
import performCourseManagerAction from '@actions/courseManagerActions';
import ColorModeSelect from '@shared-theme/ColorModeSelect'; 

export default function CreateCourse(props) {
    const [titleError, setTitleError] = React.useState(false);
    const [titleErrorMessage, setTitleErrorMessage] = React.useState('');
    const [descriptionError, setDescriptionError] = React.useState(false);
    const [descriptionErrorMessage, setDescriptionErrorMessage] = React.useState('');
    const [teacherError, setTeacherError] = React.useState(false);
    const [teacherErrorMessage, setTeacherErrorMessage] = React.useState('');
    const [teacher, setTeacher] = React.useState('');
    const { setPage, authStatus } = useAppContext();
    const [teachers, setTeachers] = React.useState([]);

    React.useEffect(() => {
        const getTeachers = async () => {
            let teachers = null
            if (authStatus == 'admin') {
                teachers = await getLists('teachers');
            }
            console.log("Teachers: ", teachers);
            setTeachers(teachers);
        }
        getTeachers();

    }, []);


    


    function validateInputs() {
        let isValid = true;
        console.log("Auth Status: ", authStatus);

        if (!teacher && authStatus == 'admin') {
            console.log("Teacher: ", teacher);
            setTeacherError(true);
            setTeacherErrorMessage('Please select a teacher');
            isValid = false;
        } else {
            setTeacherError(false);
            setTeacherErrorMessage('');
        }

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
        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateInputs()) {
            return;
        }

        const data = new FormData(event.currentTarget);
        const teacher = data.get('teacher');
        const courseData = {
            action: 'create_course',
            title: data.get('title'),
            description: data.get('description'),
            user_id: teacher,
        };
        const response = await performCourseManagerAction(courseData);
        return response;
    };

    return (
        <CustomContainer
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ minHeight: '100vh', paddingTop: '2rem' }} // Center vertically and add padding at the top
        >
          <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
          <Card variant="outlined" sx={{ position: 'relative', padding: 4, minHeight: '70vh', width: '100%', maxWidth: '500px', marginTop: '2rem' }}> {/* Adjust card height and width */}
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
              Courses
            </Button>
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', marginTop: '1.5rem', marginBottom:'1rem' }} // Add margin bottom
            >
              Create Course
            </Typography>
            <Divider sx={{ marginBottom: '1.5rem' }} /> {/* Add margin bottom */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: '1.5rem' }} // Increase gap between form elements and add margin bottom
            >
              <FormControl>
                <FormLabel htmlFor="title">Title</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="title"
                  placeholder="Course Title"
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
                  placeholder="Course Description"
                  id="description"
                  variant="outlined"
                  multiline
                  rows={4}
                  error={descriptionError}
                  helperText={descriptionErrorMessage}
                  color={descriptionError ? 'error' : 'primary'}
                />
              </FormControl>
    
              {authStatus === 'admin' && (
                <FormControl>
                  <FormLabel htmlFor="teacher">Teacher</FormLabel>
                  <Select
                    required
                    fullWidth
                    name="teacher"
                    id="teacher"
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                    displayEmpty
                    error={teacherError}
                    color={teacherError ? 'error' : 'primary'}
                  >
                    <MenuItem value="" disabled>
                      Select a teacher
                    </MenuItem>
                    {teachers.map((teacher) => (
                      <MenuItem key={teacher.user_id} value={teacher.user_id}>
                        {teacher.first_name} {teacher.last_name}
                      </MenuItem>
                    ))}
                  </Select>
                  {teacherError && (
                    <Typography variant="caption" color="error">
                      {teacherErrorMessage}
                    </Typography>
                  )}
                </FormControl>
              )}
            </Box>
            <Divider sx={{ marginBottom: '1rem' }} /> {/* Add margin bottom */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Create Course
            </Button>
          </Card>
        </CustomContainer>
      );
    }