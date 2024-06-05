import { ZoneStateResponse, ZonesListResponse } from './schema';

// Some mock data so I can test the UI without a Sonos server
export const mockZonesListResponse = (): ZonesListResponse => [
  { members: [{ roomName: 'Office' }, { roomName: 'Living Room' }] },
  { members: [{ roomName: 'Kitchen' }, { roomName: 'Main Bedroom' }] },
  { members: [{ roomName: 'Shed' }, { roomName: 'Move' }] },
  { members: [{ roomName: 'Bathroom' }] },
];

export const mockZoneStateResponse = (): ZoneStateResponse => {
  return {
    currentTrack: {
      title: 'Title of The Song' + Math.random(),
      artist: `Da Vinci's Notebook`,
      album: 'The Life and Times of Mike Fanning',
      absoluteAlbumArtUri:
        'https://t2.genius.com/unsafe/340x340/https%3A%2F%2Fimages.genius.com%2Fa01ea83227dee663714f6fc75f9ddc9d.1000x1000x1.png',
    },
    playbackState: 'PLAYING',
  };
};
export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
