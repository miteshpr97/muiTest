import * as React from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { toggleSidebar } from "../utils";
import { AppBar, Box } from "@mui/material";
import MuiLogo from "../components/MuiLogo";
import ColorSchemeToggle from "../components/ColorSchemeToggle";

export default function Header({ onToggleTheme, mode }) {
  return (
    <AppBar
      sx={{
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: 0,
        width: "100vw",
        height: "var(--Header-height)",
        zIndex: 9998,
        padding: "8px 16px",
        gap: 1,
        borderBottom: "1px solid",
        borderColor: "background.level1",
        boxShadow: "none",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MuiLogo />

        <ColorSchemeToggle onClick={onToggleTheme} mode={mode} /> {/* Pass mode here */}

        <IconButton
          onClick={() => toggleSidebar()}
          variant="outlined"
          color="neutral"
          size="md"
          aria-label="Toggle sidebar"
          sx={{
            display: { xs: "flex", md: "none" },
            backgroundColor: "white",
            color: "purple",
            transition: "background-color 0.2s",
            ":hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
            fontSize: "10px",
          }}
        >
          <MenuRoundedIcon />
        </IconButton>
      </Box>
    </AppBar>
  );
}
