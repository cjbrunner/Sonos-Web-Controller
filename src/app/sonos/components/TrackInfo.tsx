'use client';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import { getZoneState } from '../actions';

const CoverImage = styled('div')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

type TrackInfoProps = {
  zone: string;
};

export const TrackInfo: React.FC<TrackInfoProps> = ({ zone }) => {
  const { isLoading, data } = useQuery({
    queryKey: ['currentZoneState', zone],
    queryFn: async () => getZoneState(zone),
  });

  const songInfo = data?.currentTrack;

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CoverImage>
          <img src={isLoading ? '' : songInfo?.absoluteAlbumArtUri} />
        </CoverImage>
        <Box sx={{ ml: 1.5, minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {isLoading ? 'Loading...' : songInfo?.artist}
          </Typography>
          <Typography noWrap>
            <b>{isLoading ? 'Loading...' : songInfo?.title}</b>
          </Typography>
          <Typography noWrap letterSpacing={-0.25}>
            {isLoading ? 'Loading...' : songInfo?.album}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
