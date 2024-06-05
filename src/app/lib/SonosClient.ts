'use client';
import {z} from 'zod';
import {useState} from 'react';

// Get the environment variable for the Sonos server
// This should be read from a .env.local file in the root
// with a line like SONOS_SERVER=http://123.123.123.242:5005
const SERVER_URL = process.env.NEXT_PUBLIC_SONOS_SERVER;
if (!SERVER_URL) {
  throw new Error('SONOS_SERVER env variable not set');
}

// Schemas for the API responses
// We'll use this to validate the data we get from the server
// which will give us known types and early errors if the data is wrong
const ZonesResponseSchema = z.array(
  z.object({
    members: z.array(z.object({roomName: z.string()})),
  }),
);
const SonosInfoSchema = z.object({
  currentTrack: z.object({
    title: z.string(),
    artist: z.string(),
    album: z.string(),
    absoluteAlbumArtUri: z.string(),
  }),
  playbackState: z.string(),
});

// The typescript types of the above schemas
export type ZonesResponse = z.infer<typeof ZonesResponseSchema>;
export type SonosInfo = z.infer<typeof SonosInfoSchema>;

// Some mock data so I can test the UI without a Sonos server
const mockZonesResponse: ZonesResponse = [
  {members: [{roomName: 'Office'}, {roomName: 'Living Room'}]},
  {members: [{roomName: 'Kitchen'}, {roomName: 'Main Bedroom'}]},
  {members: [{roomName: 'Shed'}, {roomName: 'Move'}]},
  {members: [{roomName: 'Bathroom'}]},
];

const mockSonosInfo: SonosInfo = {
  currentTrack: {
    title: 'Title of The Song',
    artist: `Da Vinci's Notebook`,
    album: 'The Life and Times of Mike Fanning',
    absoluteAlbumArtUri:
      'https://t2.genius.com/unsafe/340x340/https%3A%2F%2Fimages.genius.com%2Fa01ea83227dee663714f6fc75f9ddc9d.1000x1000x1.png',
  },
  playbackState: 'PLAYING',
};

/**
 * Send a command to the Sonos server
 */
export const handleInput = async ({
  zone,
  operation,
  param,
}: {
  zone: string;
  // TODO: limit to actual operations and params
  operation: string;
  param: string;
}) => {
  if (SERVER_URL === 'mock') {
    console.log(`Mock operation: ${zone}/${operation}/${param}`);
    return;
  }
  fetch(`${SERVER_URL}/${zone}/${operation}/${param}`).then((res) => {
    console.log(res);
    return res;
  });
};

/**
 * Get all zones from the Sonos server
 */
export async function getAllZones() {
  if (SERVER_URL === 'mock') {
    return mockZonesResponse;
  }
  return await fetch(`${SERVER_URL}/zones`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Failed to fetch zones');
      }
    })
    .then((data) => {
      return ZonesResponseSchema.parse(data);
    });
}

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Hook to get the Sonos info for a specific zone
 */
export const useSonosInfo = () => {
  const [sonosInfo, setSonosInfo] = useState<SonosInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getInfo = async (zone: string) => {
    if (SERVER_URL === 'mock') {
      setIsLoading(true);
      await wait(1000);
      setSonosInfo(mockSonosInfo);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const statePath = `${SERVER_URL}/${zone}/state`;
      const res = await fetch(statePath);
      if (res.ok) {
        setSonosInfo(await res.json());
      } else {
        console.error(`Failed to fetch ${statePath}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    sonosInfo,
    getInfo,
  };
};
