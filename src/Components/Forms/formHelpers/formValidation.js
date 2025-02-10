const doValidateInputs = (setEmailError, setEmailErrorMessage, setPasswordError, setPasswordErrorMessage, setUsernameError, setUsernameErrorMessage) => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const username = document.getElementById('username');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        setEmailError(true);
        setEmailErrorMessage('Please enter a valid email address.');
        isValid = false;
    } else {
        setEmailError(false);
        setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
        setPasswordError(true);
        setPasswordErrorMessage('Password must be at least 6 characters long.');
        isValid = false;
    } else {
        setPasswordError(false);
        setPasswordErrorMessage('');
    }

    if (!username.value || username.value.length < 1) {
        setUsernameError(true);
        setUsernameErrorMessage('Name is required.');
        isValid = false;
    } else {
        setUsernameError(false);
        setUsernameErrorMessage('');
    }
    return isValid;
};

export default doValidateInputs;