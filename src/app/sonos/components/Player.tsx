'use client';
import React, { useState } from 'react';
import { TrackControls } from './TrackControls';
import { TrackInfo } from './TrackInfo';
// import { TrackPosition } from './TrackPosition';
import { VolumeControls } from './VolumeControls';
import { ZoneSelector } from './ZoneSelector';
import { styled } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 640,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

type PlayerProps = {
  initialZone: string;
};

export const Player: React.FC<PlayerProps> = ({ initialZone }) => {
  const [zone, setZone] = useState(initialZone);

  return (
    <QueryClientProvider client={queryClient}>
      <Widget>
        <TrackInfo zone={zone} />
        <TrackControls zone={zone} />
        {/* <TrackPosition /> */}
        <VolumeControls zone={zone} />
        <ZoneSelector zone={zone} handleSetZone={setZone} />
      </Widget>
    </QueryClientProvider>
  );
};
