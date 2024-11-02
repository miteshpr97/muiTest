import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function ColorSchemeToggle(props) {
    const { onClick, sx, mode, ...other } = props; // Destructure mode from props
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <IconButton size="small" color="default" disabled {...other} sx={sx} />
        );
    }

    return (
        <IconButton
            id="toggle-mode"
            size="small"
            color="default"
            {...other}
            onClick={onClick}
            sx={[
                {
                    // Hide icons based on the current mode
                    '& > *:first-of-type': {
                        display: mode === 'dark' ? 'none' : 'block', // Light icon should show in light mode
                    },
                    '& > *:last-of-type': {
                        display: mode === 'light' ? 'none' : 'block', // Dark icon should show in dark mode
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <LightModeIcon />
            <DarkModeRoundedIcon />
        </IconButton>
    );
}
