'use client';

import { Box, IconButton } from '@mui/material';
import {
  PlayArrowRounded,
  PauseRounded,
  FastForwardRounded,
  FastRewindRounded,
} from '@mui/icons-material/';
import { useTheme } from '@mui/system';
import {
  useNextMutation,
  usePlayPauseMutation,
  usePreviousMutation,
  useZoneStateQuery,
} from '../queries';

type TrackControlsProps = {
  zone: string;
};

export const TrackControls: React.FC<TrackControlsProps> = ({ zone }) => {
  const theme = useTheme();
  const { mutate: playPause } = usePlayPauseMutation(zone);
  const { mutate: next } = useNextMutation(zone);
  const { mutate: previous } = usePreviousMutation(zone);
  const { data: zoneState, isLoading } = useZoneStateQuery(zone);

  if (isLoading || !zoneState) {
    return <div>Loading...</div>;
  }

  const { playbackState } = zoneState;

  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: -1,
      }}
    >
      <IconButton aria-label="previous song" onClick={() => previous()}>
        <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
      </IconButton>
      <IconButton
        aria-label={playbackState ? 'play' : 'pause'}
        onClick={() => {
          playPause();
        }}
      >
        {playbackState === 'paused' ? (
          <PlayArrowRounded
            sx={{ fontSize: '4rem' }}
            htmlColor={mainIconColor}
          />
        ) : (
          <PauseRounded sx={{ fontSize: '4rem' }} htmlColor={mainIconColor} />
        )}
      </IconButton>
      <IconButton aria-label="next song" onClick={() => next()}>
        <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
      </IconButton>
    </Box>
  );
};
