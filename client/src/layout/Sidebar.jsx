import * as React from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Collapse,
  useTheme,
  Divider,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import Cookies from "js-cookie";
import userContext from "../context/userContext/userContext";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // sample icon
import SettingsIcon from "@mui/icons-material/Settings";

export default function Sidebar() {
  const theme = useTheme();
  const location = useLocation();
  const [openModules, setOpenModules] = React.useState({});

  const { user } = React.useContext(userContext);

  function getInitials(name) {
    if (!name) {
      return "...";
    }
    const words = name.split(" ");
    let initials = "";
    for (let i = 0; i < words.length; i++) {
      initials += words[i].charAt(0).toUpperCase();
    }
    return initials;
  }

  const logout = async () => {
    const isOkay = window.confirm("You are about to be logged out");
    if (isOkay) {
      Cookies.remove("token");
      window.location.reload();
    }
  };

  const menuData = [
    {
      USER_CD: "GL00001",
      MODULE_CD: "AM",
      MODULE_NM: "Finance Module",
      MENU_CD: "AMT100",
      MENU_NM: "Transaction",
      PAGE_CD: "GLAMT100100",
      PAGE_NM: "Register Transaction",
      PAGE_YN: "Y",
      PAGE_LNK: "/GLAMT100100",
    },
    {
      USER_CD: "GL00001",
      MODULE_CD: "CM",
      MODULE_NM: "Common Module",
      MENU_CD: "CMA100",
      MENU_NM: "Basic Setting",
      PAGE_CD: "GLCMA100100",
      PAGE_NM: "User Creation",
      PAGE_YN: "Y",
      PAGE_LNK: "/UserCreation",
    },
    {
      USER_CD: "GL00001",
      MODULE_CD: "CM",
      MODULE_NM: "Common Module",
      MENU_CD: "CMA100",
      MENU_NM: "Basic Setting",
      PAGE_CD: "GLCMA100200",
      PAGE_NM: "User Access",
      PAGE_YN: "Y",
      PAGE_LNK: "/UserAccess",
    },
    {
      USER_CD: "GL00001",
      MODULE_CD: "CM",
      MODULE_NM: "Common Module",
      MENU_CD: "CMB100",
      MENU_NM: "Common Code",
      PAGE_CD: "GLCMA100300",
      PAGE_NM: "Create Common Code",
      PAGE_YN: "Y",
      PAGE_LNK: "/CommonCode",
    },
  ];

  const iconMap = {
    AM: <AccountBalanceIcon />,
    CM: <SettingsIcon />,
  };

  const groupedMenuData = menuData.reduce((acc, item) => {
    const { MODULE_NM, MENU_NM } = item;
    acc[MODULE_NM] = acc[MODULE_NM] || {};
    acc[MODULE_NM][MENU_NM] = acc[MODULE_NM][MENU_NM] || [];
    acc[MODULE_NM][MENU_NM].push(item);
    return acc;
  }, {});

  const handleToggle = (moduleName) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleName]: !prev[moduleName],
    }));
  };

  const renderMenu = (menuItems) => (
    <List size="sm" sx={{ gap: 1, "--List-nestedInsetStart": "20px" }}>
      {Object.entries(menuItems).map(([menuName, pages]) => (
        <List component="div" disablePadding key={menuName}>
          <ListItemButton
            onClick={() => handleToggle(menuName)}
            sx={{
              padding: "3px 16px",
              "&:hover": { backgroundColor: theme.palette.action.hover },
              "&.Mui-selected": {
                backgroundColor: theme.palette.action.selected,
                borderRadius: `${theme.shape.borderRadius}px`,
              },
            }}
          >
            <ListItemText primary={menuName} sx={{ fontSize: "14px" }} />
            {openModules[menuName] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openModules[menuName]} timeout="auto" unmountOnExit>
            <List component="div">
              {pages.map((page) => (
                <ListItem key={page.PAGE_CD} disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={page.PAGE_LNK}
                    selected={location.pathname === page.PAGE_LNK}
                    sx={{
                      padding: "3px 16px",
                      "&.active": {
                        backgroundColor: theme.palette.action.selected,
                        color: theme.palette.primary.main,
                        borderRadius: `${theme.shape.borderRadius}px`,
                      },
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemText
                      primary={page.PAGE_NM}
                      sx={{ fontSize: "13px" }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      ))}
    </List>
  );

  return (
    <Drawer
      className="Sidebar"
      variant="permanent"
      anchor="left"
      sx={{
        position: "fixed",
        top: 55,
        left: 0,
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s ease, width 0.4s ease",
        width: "var(--Sidebar-width)",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #ddd",
        [`& .MuiDrawer-paper`]: {
          width: "220px",
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.default,
          top: "unset",
          height: "calc(100vh - 55px)",
        },
        height: "calc(100vh - 55px)",
      }}
    >
      <GlobalStyles
        styles={{
          ":root": {
            "--Sidebar-width": "220px",
            "--Header-height": "55px",
          },
        }}
      />
      <Box
        sx={{
          minHeight: 0,
          overflow: "auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "20px",
          }}
        >
          <ListItem>
            <ListItemButton
              component={NavLink}
              to="/"
              selected={location.pathname === "/"}
              sx={{
                padding: "3px 16px",
                "&.active": {
                  backgroundColor: theme.palette.action.selected,
                  color: theme.palette.primary.main,
                  borderRadius: `${theme.shape.borderRadius}px`,
                },
              }}
            >
              <DashboardRoundedIcon sx={{ fontSize: 18, marginRight: 1 }} />
              <ListItemText
                primary="Dashboard"
                sx={{ "& .MuiListItemText-primary": { fontSize: "0.875rem" } }}
              />
            </ListItemButton>
          </ListItem>

          {Object.entries(groupedMenuData).map(([moduleName, menuItems]) => (
            <div key={moduleName}>
              <ListItemButton
                onClick={() => handleToggle(moduleName)}
                sx={{
                  padding: "3px 16px",
                  "&:hover": { backgroundColor: theme.palette.action.hover },
                }}
              >
                <ListItemText
                  primary={moduleName}
                  sx={{
                    "& .MuiListItemText-primary": { fontSize: "0.875rem" },
                  }}
                />
                {openModules[moduleName] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={openModules[moduleName]}
                timeout="auto"
                unmountOnExit
              >
                {renderMenu(menuItems)}
              </Collapse>
            </div>
          ))}
        </List>
      </Box>

      {/* User section */}
      <Divider />

      <Box sx={{ display: "flex", gap: 1, alignItems: "center", padding: 2 }}>
        <Avatar sx={{ width: 32, height: 32 }}>
          {user && getInitials(user.name)}
        </Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {user ? user.name : "Guest"}
          </Typography>
          <Typography
            variant="caption"
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {user ? user.email : ""}
          </Typography>
        </Box>
        <IconButton onClick={logout} size="small">
          <LogoutRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Drawer>
  );
}

