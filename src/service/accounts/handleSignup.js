import handleLogin from "./handleLogin";

const handleSignup = async (first_name, last_name, username, email, password, role) => {
    console.log(first_name, last_name, username, email, password, role);
    const response = await fetch('http://localhost:8000/accounts/signup/', {
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

      // Add to local storage so I can add to headers later
      localStorage.setItem('token', data.token);
  
      // Return success and the token
      return {
        success: true,
        message: 'Signup successful',
        token: data.token
      };
    } else {
      try {
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
  