import base_url from '../base_url'

const handleLogin = async (username, password) => {
    const response = await fetch(`${base_url}accounts/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    
    // Parse the JSON response
    const data = await response.json();
  
    // Check if the login was successful
    if (response.ok) {

      // Add to local storage so I can add to headers later
      localStorage.setItem('token', data.token);
      console.log("Login successful:", data.token);
  
      // Return success and the token
      return {
        success: true,
        message: 'Login successful',
        token: data.token,
        userType: data.user_type
      };
    } else {
      console.error('Login failed:', data.error || 'Unknown error');
  
      // Return failure and error message
      return {
        success: false,
        message: data.error || 'Username or password is incorrect',
      };
    }
  };
  
  export default handleLogin;
  