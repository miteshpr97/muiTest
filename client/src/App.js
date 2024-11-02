import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Outlet,redirect, useNavigate } from 'react-router-dom';
import { CssBaseline, Box, ThemeProvider, createTheme } from '@mui/material'; // Import MUI components
import userContext from './context/userContext/userContext';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import configServ from './services/config';

const theme = createTheme(); // Create a theme for MUI

function App() {
    const location = useLocation();
    const { setUser } = useContext(userContext);
    const navigate = useNavigate();
    const token = Cookies.get('token');
    let decodedToken;


    const [mode, setMode] = useState('light'); // Initial theme mode

    const toggleTheme = () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const getAdmin = async (id) => {
        const admin = await configServ.getAdminById(id);
        setUser(admin);
    };

    useEffect(() => {
        if (token) {
            decodedToken = jwtDecode(token);
            getAdmin(decodedToken.id);
        } else {
            // navigate('/login'); 
        }
    }, [location.pathname]);


    const theme = createTheme({
        palette: {
            mode: mode,
            ...(mode === 'light'
                ? {
                    background: {
                        default: '#ffffff',
                        paper: '#f5f5f5',
                    },
                    text: {
                        primary: '#000000',
                        secondary: '#555555',
                    },
                }
                : {
                    background: {
                        default: '#121212',
                        paper: '#1e1e1e',
                    },
                    text: {
                        primary: '#ffffff',
                        secondary: '#aaaaaa',
                    },
                }),
        },
    });




    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            
               
                {location.pathname !== '/login' && <Header onToggleTheme={toggleTheme} mode={mode} />            }
                {location.pathname !== '/login' && <Sidebar />}
                <Box
                    component="main"
                    className="MainContent"
                    sx={{
                        pt: { xs: 'calc(12px + var(--Header-height))' },
                        pb: { xs: 2, sm: 2, md: 0 },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100vh',
                        gap: 1,
                        marginLeft: { xs: 0, md: 'var(--Sidebar-width)' },
                        padding: '10px',
                        // zIndex: 1000,
                        overflow: "auto"
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;

export const AppLoader = () => {
    const token = Cookies.get('token');
    if (!token) {
        // return redirect('/login')
    }
    return null;
};

