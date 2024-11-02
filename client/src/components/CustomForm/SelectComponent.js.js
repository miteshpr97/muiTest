// SelectComponent.js
import React from 'react';
import { FormControl, FormLabel, Select, Option } from '@mui/joy';

function SelectComponent({ label, options, ...props }) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select {...props}>
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectComponent;
