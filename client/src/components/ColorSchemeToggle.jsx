import React from 'react';
import IconButton from '@mui/material/IconButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function ColorSchemeToggle({ onClick, mode, sx, ...other }) {
    return (
        <IconButton
            size="small"
            color="default"
            onClick={onClick}
            {...other}
            sx={sx}
        >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeIcon />}
        </IconButton>
    );
}
