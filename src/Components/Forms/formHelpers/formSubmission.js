import handleSignup from '@accounts/handleSignup';

const userFormSubmission = async(authStatus, setAuthStatus, data, setPage) => {
    const full_name = data.get('full_name');
    const first_name = full_name.split(' ')[0];
    const last_name = full_name.split(' ')[1];
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    const role = data.get('role');
    const signupResponse = await handleSignup(authStatus, first_name, last_name, username, email, password, role);
    if (signupResponse.success && authStatus !== 'admin') {
        setPage('Home');
        setAuthStatus(role);
    } 
    console.log(signupResponse.message);
}

export { userFormSubmission };