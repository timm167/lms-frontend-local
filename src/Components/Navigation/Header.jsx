import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { useAppContext } from '@/AppContext';
import handleLogout from '@accounts/handleLogout';

function Header() {
    const { setPage, setAuthStatus, authStatus } = useAppContext();

    const handleNavigation = (page) => {
        if (page === 'Login') {
            handleLogout();
            setAuthStatus('unauthorized');
        }
        setPage(page);
    };
    
    return (
        <AppBar position="fixed" sx={{ width: '100%', height: '80px', backgroundColor: '#0A2472' }}> {/* Adjust height and background color */}
            <Toolbar sx={{ width: '100%', maxWidth: '1440px', margin: '0 auto', height: '100%' }}>
                <Typography variant="h6" sx={{ flexGrow: 0.1, textAlign: 'left', ml: 1 }}>
                    Learning Management System
                </Typography>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-around', mr: 2 }}>
                    <Button color="inherit" onClick={() => handleNavigation('Home')}>Home ({authStatus})</Button>
                    <Button color="inherit" onClick={() => handleNavigation('Playground')}>Toggle Playground</Button>
                    <Button color="inherit" onClick={() => handleNavigation('Login')}>{authStatus == 'unauthorized' ? 'Login' : 'Sign Out'}</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;