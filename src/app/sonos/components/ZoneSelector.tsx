import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, MenuProps, Select } from '@mui/material';
import { useZoneListQuery, useZoneStateQuery } from '../queries';

// prettier-ignore

type ZoneSelectorProps = {
  zone: string;
  handleSetZone: (zone: string) => void;
};

export const ZoneSelector: React.FC<ZoneSelectorProps> = ({
  zone,
  handleSetZone,
}) => {
  const result = useZoneListQuery();
  console.log(result);
  const { data: zones, isLoading } = result;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Select
        label="Zone"
        value={zone}
        onChange={(e) => {
          handleSetZone(e.target.value);
        }}
      >
        {isLoading && <MenuItem value={zone}>{zone}</MenuItem>}
        {zones?.sort().map((zone) => (
          <MenuItem key={zone} value={zone}>
            {zone}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
