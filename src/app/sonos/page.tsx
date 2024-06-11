require('source-map-support').install();

import { Box } from '@mui/material';
import { Player } from './components/Player';
import { WallPaper } from './components/Wallpaper';

export default async function SonosPlayer({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const defaultZone = searchParams.defaultzone;
  const initialZone = Array.isArray(defaultZone)
    ? defaultZone[0]
    : defaultZone ?? 'Office';

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Player initialZone={initialZone} />
      <WallPaper />
    </Box>
  );
}
