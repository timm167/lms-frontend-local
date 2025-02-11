import handleLogin from "./handleLogin";
import base_url from '../base_url'


const handleSignup = async (authStatus, first_name, last_name, username, email, password, role) => {
    const response = await fetch(`${base_url}accounts/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name,
        last_name,
        username,
        email,
        password,
        role
      }),
    });
    
    // Parse the JSON response
    const data = await response.json();
  
    // Check if the signup was successful
    if (response.ok) {

      if (authStatus !== 'admin'){
        localStorage.setItem('token', data.token);
      }
  
      // Return success and the token
      return {
        success: true,
        message: 'Signup successful',
        token: data.token
      };
    } else {
      try {
        if (action == 'create'){
          console.log('User Already Exists')
          return {
            success: false,
            message: 'User Already Exists',
          };
        }
        handleLogin(username, password)
        console.log("Account already exists, logging in instead")
      } catch (error) {console.error('Signup failed:', data.error || 'Unknown error');}
      
      // Return failure and error message
      return {
        success: false,
        message: data.error || 'Signup failed',
      };
    }
  };
  
  export default handleSignup;
  