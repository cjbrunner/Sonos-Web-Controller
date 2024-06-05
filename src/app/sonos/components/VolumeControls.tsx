'use client';

import { Stack, Slider, SliderOwnProps } from '@mui/material';
import { VolumeDownRounded, VolumeUpRounded } from '@mui/icons-material/';
import { useTheme } from '@mui/system';
import { useSetVolumeMutation, useZoneStateQuery } from '../queries';

type VolumeControlsProps = {
  zone: string;
};

export const VolumeControls: React.FC<VolumeControlsProps> = ({ zone }) => {
  const theme = useTheme();
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const { data: currentZoneState, isLoading: zoneStateLoading } =
    useZoneStateQuery(zone);
  const { mutate: setVolume } = useSetVolumeMutation(zone);

  if (!currentZoneState || zoneStateLoading) {
    return null;
  }

  const handleSetVolume: SliderOwnProps['onChangeCommitted'] = (
    event,
    newValue,
  ) => {
    setVolume({ volume: Array.isArray(newValue) ? newValue[0] : newValue });
  };
  // We should be pulling the volume off of here, but I'm not sure
  // what that property is.
  const {} = currentZoneState;

  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ mb: 1, px: 1 }}
      alignItems="center"
    >
      <VolumeDownRounded htmlColor={lightIconColor} />
      <Slider
        aria-label="Volume"
        onChangeCommitted={handleSetVolume}
        sx={{
          color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
          '& .MuiSlider-track': {
            border: 'none',
          },
          '& .MuiSlider-thumb': {
            width: 24,
            height: 24,
            backgroundColor: '#fff',
            '&::before': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
            },
            '&:hover, &.Mui-focusVisible, &.Mui-active': {
              boxShadow: 'none',
            },
          },
        }}
      />
      <VolumeUpRounded htmlColor={lightIconColor} />
    </Stack>
  );
};
