'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import { useZoneListQuery } from '../queries';

// prettier-ignore

type ZoneSelectorProps = {
  zone: string;
  handleSetZone: Dispatch<SetStateAction<string>>;
};

export const ZoneSelector: React.FC<ZoneSelectorProps> = ({
  zone,
  handleSetZone,
}) => {
  const result = useZoneListQuery();
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
