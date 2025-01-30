const handleLogout = async () => {
    try {
        localStorage.removeItem('token');
        console.log("Logout successful");
    } catch (error) {
        console.error("Logout failed", error);
    }
}

export default handleLogout;