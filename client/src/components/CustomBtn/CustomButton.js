import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/joy';

const CustomButton = ({ 
  variant, 
  color, 
  size, 
  disableElevation, 
  startIcon, 
  endIcon, 
  onClick, 
  children, 
  ...props 
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disableElevation={disableElevation}
      startDecorator={startIcon}
      endDecorator={endIcon}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  variant: PropTypes.oneOf(['plain', 'outlined', 'soft', 'solid']),
  color: PropTypes.oneOf(['neutral', 'primary', 'danger', 'info', 'success', 'warning']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disableElevation: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

CustomButton.defaultProps = {
  variant: 'solid',
  color: 'primary',
  size: 'md',
  disableElevation: false,
  startIcon: null,
  endIcon: null,
  onClick: () => {},
};
  
export default CustomButton;
