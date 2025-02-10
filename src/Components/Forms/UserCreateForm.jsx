import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CustomContainer, Card } from '@shared-theme/customDesign';
import { Select, MenuItem } from '@mui/material';
import doValidateInputs from '@forms/formHelpers/formValidation';
import { userFormSubmission } from '@forms/formHelpers/formSubmission';
import { useAppContext } from '../../AppContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ColorModeSelect from '@/shared-theme/ColorModeSelect';
import '@css/forms.css';

export default function CreateUser(props) {
const [emailError, setEmailError] = React.useState(false);
const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
const [passwordError, setPasswordError] = React.useState(false);
const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
const [usernameError, setUsernameError] = React.useState(false);
const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
const [role, setRole] = React.useState('student');
const { setPage, authStatus, setAuthStatus } = useAppContext();

function validateInputs(){
    doValidateInputs(setEmailError, setEmailErrorMessage, setPasswordError, 
        setPasswordErrorMessage, setUsernameError, setUsernameErrorMessage);
}

const handleSubmit = async (event) => {
    event.preventDefault();
    validateInputs();
    if (usernameError || emailError || passwordError) {
        console.log('Error in form');
        return;
    }
    const data = new FormData(event.currentTarget);
    data.append('role', role);
    if( props.formTitle == 'Sign Up' && role != 'student') {
        alert('Ask an admin to create a teacher or admin account');
        return;
    }
    userFormSubmission(authStatus, setAuthStatus, data, setPage)
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
          onClick={() => {
            const newPage = authStatus === 'admin' ? 'Home' : 'Login';
            setPage(newPage);
          }}
        >
          {authStatus === 'admin' ? 'Home' : 'Login'}
        </Button>
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)', marginBottom: '1rem' }} // Adjust font size and margin bottom
        >
          {props.formTitle}
        </Typography>
        <FormControl sx={{ position: 'absolute', top: 21, right: 20, minWidth: 120 }}>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Role' }}
            size="small"
          >
            <MenuItem value="" disabled>
              Role
            </MenuItem>
            <MenuItem value="student">Student</MenuItem>
            {authStatus == 'admin' && (
              <>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </>
            )}
          </Select>
        </FormControl>
        <Divider sx={{ marginBottom: '1rem' }} /> {/* Adjust margin bottom */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: '1rem' }} // Increase gap between form elements and adjust margin bottom
        >
          <FormControl>
            <FormLabel htmlFor="full_name">Full Name</FormLabel>
            <TextField
              required
              fullWidth
              name="full_name"
              placeholder="Jon Doe"
              id="full_name"
              variant="outlined"
              color={'primary'}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <TextField
              required
              fullWidth
              name="username"
              placeholder="django123"
              id="username"
              error={usernameError}
              helperText={usernameErrorMessage}
              color={usernameError ? 'error' : 'primary'}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              placeholder="your@email.com"
              name="email"
              autoComplete="email"
              variant="outlined"
              error={emailError}
              helperText={emailErrorMessage}
              color={emailError ? 'error' : 'primary'}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              required
              fullWidth
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="new-password"
              variant="outlined"
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <Divider sx={{ marginBottom: '1rem' }} /> {/* Adjust margin bottom */}
          <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          {props.formTitle}
        </Button>
        </Box>

      </Card>
    </CustomContainer>
  );
}
