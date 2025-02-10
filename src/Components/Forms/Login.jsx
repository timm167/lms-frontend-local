import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ColorModeSelect from '@/shared-theme/ColorModeSelect';
import handleLogin from '@accounts/handleLogin';
import { CustomContainer, Card } from '@shared-theme/customDesign';
import { useAppContext } from '../../AppContext';

export default function SignIn(props) {
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const { setPage, setAuthStatus } = useAppContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (nameError || passwordError) {
      event.preventDefault();
      return;
    }
    // Get the form data
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    // Fetch token from Django Rest Framework
    const loginResponse = await handleLogin(username, password);
    console.log(loginResponse);
    if (loginResponse.success) {
      const userType = loginResponse.userType;
      setAuthStatus(userType);
      setPage('Home');
    }


  };

  const validateInputs = () => {
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    let isValid = true;

    if (!username.value || username.value.length < 1) {
        setNameError(true);
        setNameErrorMessage('Name is required.');
        isValid = false;
    }
    // SET AS 1 FOR DEVELOPMENT
    if (!password.value || password.value.length < 1) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    return isValid;
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
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', marginBottom: '1.5rem' }} // Add margin bottom
        >
          Sign in
        </Typography>
        <Divider sx={{ marginBottom: '1.5rem' }} /> {/* Add margin bottom */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 3, // Increase gap between form elements
            marginBottom: '1.5rem' // Add margin bottom
          }}
        >
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <TextField
              error={nameError}
              helperText={nameErrorMessage}
              id="username"
              type="username"
              name="username"
              placeholder="John Doe"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={nameError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Sign in
          </Button>
        </Box>
        <Divider sx={{ marginBottom: '1rem' }} >or</Divider>        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Button
              variant="body2"
              sx={{ alignSelf: 'center' }}
              onClick={() => setPage('Signup')}
            >
              Sign up
            </Button>
          </Typography>
        </Box>
      </Card>
    </CustomContainer>
  );
}
