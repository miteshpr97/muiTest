import * as React from "react";
import { Box } from "@mui/material";
import Logo from "../assets/OWM_White.png";

export default function MuiLogo(props) {
  const { sx, ...other } = props;

  return (
    <Box
      {...other}
      sx={[
        {
          width: 46,
          height: 46, // Maintain a square aspect ratio
          borderRadius: "4px", // You can adjust the border radius as needed
          overflow: "hidden", // To ensure the image doesn't overflow
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <img
        src={Logo}
        alt="Custom Logo"
        style={{ width: "100%", height: "100%", objectFit: "cover" }} // Maintain aspect ratio with cover
      />
    </Box>
  );
}
