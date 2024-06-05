import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, MenuProps } from '@mui/material';
import { handleInput } from '../../lib/SonosClient';

// prettier-ignore
const zones = [ 'Office', 'Living Room','Kitchen','Main Bedroom','Shed','Move', 'Bathroom'];

type ZoneSelectorProps = {
  initZone: string;
  handleSetZone: (zone: string) => void;
};

export const ZoneSelector: React.FC<ZoneSelectorProps> = ({
  initZone,
  handleSetZone,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
    // handleSetZone(event);
  };
  const handleMenuClose: MenuProps['onClose'] = (event) => {
    setAnchorEl(null);
  };
  const handleItemClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {initZone}...
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {zones.sort().map((zone) => (
          <MenuItem
            key={zone}
            onClick={() => {
              handleItemClose();
              handleSetZone(zone);
            }}
          >
            {zone}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
