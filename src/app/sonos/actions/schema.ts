import { z } from 'zod';

// Schemas for the API responses
// We'll use this to validate the data we get from the server
// which will give us known types and early errors if the data is wrong
export const ZonesListResponseSchema = z.array(
  z.object({
    members: z.array(z.object({ roomName: z.string() })),
  }),
);

export const ZoneStateResponseSchema = z.object({
  currentTrack: z.object({
    title: z.string(),
    artist: z.string(),
    album: z.string(),
    absoluteAlbumArtUri: z.string(),
  }),
  playbackState: z.string(),
});

// The typescript types of the above schemas
export type ZonesListResponse = z.infer<typeof ZonesListResponseSchema>;
export type ZoneStateResponse = z.infer<typeof ZoneStateResponseSchema>;
