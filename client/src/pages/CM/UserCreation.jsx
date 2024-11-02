import React from "react";
import { Grid, Box, Typography, Button, IconButton, Modal } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import InputFieldComponent from "../../components/CustomForm/InputFieldComponent";
import SelectComponent from "../../components/CustomForm/SelectComponent.js";
import DatePickerComponent from "../../components/CustomForm/DatePickerComponent.js.js";
import CommonButton from "../../components/CustomBtn/CommonBtn";
import { FormControl } from "@mui/joy";
import { useState } from "react";

const UserCreation = () => {
  const [open, setOpen] = useState(false);
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];



  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <Box sx={{ width: "100%", height: "100dvh" }}>
      <CommonButton />
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h6" mr={1}>
          User Creation
        </Typography>
        <IconButton color="primary" onClick={handleOpen}>
          <AddIcon />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <InputFieldComponent
            label="Employee Code"
            placeholder="Employee Code"
          />
        </Grid>
        <Grid item xs={2}>
          <InputFieldComponent label="First Name" placeholder="First Name" />
        </Grid>
        <Grid item xs={2}>
          <InputFieldComponent label="Middle Name" placeholder="Middle Name" />
        </Grid>
        <Grid item xs={2}>
          <InputFieldComponent label="Last Name" placeholder="Last Name" />
        </Grid>
        <Grid item xs={2}>
          <InputFieldComponent
            label="Position Code"
            placeholder="Position Code"
          />
        </Grid>
        <Grid item xs={2}>
          <InputFieldComponent
            label="Department Code"
            placeholder="Department Code"
          />
        </Grid>
        <Grid item xs={2}>
          <InputFieldComponent label="Email" placeholder="Email" />
        </Grid>
        <Grid item xs={2}>
          <InputFieldComponent label="Mobile No 1" placeholder="Mobile No 1" />
        </Grid>
        <Grid item xs={2}>
          <InputFieldComponent label="Mobile No 2" placeholder="Mobile No 2" />
        </Grid>
        <Grid item xs={2}>
          <InputFieldComponent label="Ref No" placeholder="Ref No" />
        </Grid>
        <Grid item xs={2}>
          <DatePickerComponent label="Date of Birth" />
        </Grid>
        <Grid item xs={2}>
          <DatePickerComponent label="Date Joined" />
        </Grid>
        <Grid item xs={2}>
          <SelectComponent label="Gender" options={genderOptions} />
        </Grid>
        <Grid item xs={2}>
          <InputFieldComponent label="Status" placeholder="Status" />
        </Grid>
        <Grid item xs={2}>
          <InputFieldComponent label="Religion" placeholder="Religion" />
        </Grid>
        <Grid item xs={2}>
          <InputFieldComponent label="State" placeholder="State" />
        </Grid>
        <Grid item xs={2}>
          <InputFieldComponent label="City" placeholder="City" />
        </Grid>
        <Grid item xs={2}>
          <InputFieldComponent label="Pin Code" placeholder="Pin Code" />
        </Grid>
        <Grid item xs={2}>
          <InputFieldComponent label="Landmark" placeholder="Landmark" />
        </Grid>
        <Grid item xs={2}>
          <InputFieldComponent label="Nation ID" placeholder="Nation ID" />
        </Grid>
        <Grid item xs={2}>
          <InputFieldComponent label="PAN Card" placeholder="PAN Card" />
        </Grid>
      </Grid>
      


      {/* Modal for adding a new user */}
      <Modal open={open} onClose={handleClose}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust background color and transparency
          backdropFilter: "none", // Adjust the blur effect
        },
      }}
      
      >
        <Box sx={{ 
          
          p: 3,
          bgcolor: "white", // Set background color to white
          color: "text.primary", // Set text color to the primary text color
          boxShadow: 24,
          borderRadius: 2,
          width: "400px",
          mx: "auto",
          my: "10%",
          
          
          }}>
          <Typography variant="h6" component="h2" mb={2}>
            Add New User
          </Typography>
          {/* Additional input fields for the modal can be added here */}
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
     


    </Box>
  );
};

export default UserCreation;
