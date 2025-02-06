import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Link } from '@mui/material';
import { useAppContext } from '@/AppContext';

function Footer() {
    const [isBottom, setIsBottom] = useState(false);
    const { page } = useAppContext();

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const isAtBottom = scrollTop + windowHeight >= documentHeight - 45

            setIsBottom(isAtBottom);
        };

        // Trigger the check on initial load
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsBottom(false);
    }, [page]);

    return (
        <AppBar 
            position='fixed' 
            sx={{ 
                width: '100%', 
                boxShadow: 'none', 
                height: '120px', 
                top: 'auto', 
                bottom: 0, 
                backgroundColor: 'transparent', 
                alignItems: 'center', 
                userSelect: 'none',
                display: () => page === 'Playground' ? 'none' : 'flex',
                zIndex: (theme) => isBottom ? theme.zIndex.appBar : -1 
            }}
        >
            <Toolbar 
                sx={{ 
                    width: '100%', 
                    maxWidth: '1440px', 
                    margin: '0 auto', 
                    height: '100%', 
                    display: 'flex', 
                    justifyContent: 'space-around', 
                    alignItems: 'center', 
                    textAlign: 'center' 
                }}
            >
                {/* Remove individual z-index from children */}
                <Typography variant="body1" sx={{ color: '#fff' }}>
                    Built by Tim Charteris
                </Typography>
                <Link href="https://github.com/timm167" target="_blank" rel="noopener" sx={{ color: '#fff', textDecoration: 'none' }}>
                    https://github.com/timm167
                </Link>
                <Typography variant="h6" sx={{ color: '#fff' }}>
                    Learning Management System
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Footer;