// DatePickerComponent.js
import React from 'react';
import { Input, FormControl, FormLabel } from '@mui/joy';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function DatePickerComponent({ label, placeholder = "mm/dd/yyyy", ...props }) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input 
        placeholder={placeholder}
        endDecorator={<CalendarTodayIcon />}
        {...props} 
      />
    </FormControl>
  );
}

export default DatePickerComponent;
