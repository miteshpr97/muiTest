// InputFieldComponent.js
import React from 'react';
import { Input, FormControl, FormLabel } from '@mui/joy';

function InputFieldComponent({ label, placeholder, ...props }) {

  console.log(label, "hhhhhhhhhhh");
  
  return (
    <FormControl>

      <FormLabel sx={{fontSize:"0.8rem"}}>{label}</FormLabel>
       <Input size="sm" placeholder={placeholder} {...props}

      //  sx={{
      //   borderRadius: '0',
        
      //  }}
       
       />
    </FormControl>
  );
}

export default InputFieldComponent;
