import {useState} from 'react';
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { handleInput } from '../../lib/SonosClient';

const zones = ["office", "living room", "kitchen", "main bedroom", "shed", "move", "sammy"];

export const ZoneSelector = ({initZone, handleSetZone}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(`click event: ${event}`);
    // handleSetZone(event);
  };
  const handleClose = (event) => {
    console.log(`close event: ${event}`);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Zones...
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {zones.map((zone) => (
          <MenuItem key={zone} onClick={() => handleSetZone(zone)}>{zone}</MenuItem>
        ))}
      </Menu>
    </Box>
  );
}