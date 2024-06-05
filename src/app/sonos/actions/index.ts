'use server';

import { mockZonesListResponse, mockZoneStateResponse, wait } from './mock';
import { ZonesListResponseSchema, ZoneStateResponseSchema } from './schema';

// Get the environment variable for the Sonos server
// This should be read from a .env.local file in the root
// with a line like SONOS_SERVER=http://123.123.123.242:5005
// Setting this to 'mock' will use the mock data
const SERVER_URL = process.env.NEXT_PUBLIC_SONOS_SERVER;
if (!SERVER_URL) {
  throw new Error('SONOS_SERVER env variable not set');
}

const loudFetch: typeof fetch = async (path, options) => {
  const res = await fetch(path, options);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${path}. Status ${res.status}: ${res.statusText}`,
    );
  }
  return res;
};

/**
 * Get a list of zones from the Sonos server
 */
export async function getZonesList() {
  let data;
  console.log('trying to fetch zones');
  if (SERVER_URL === 'mock') {
    await wait(1000);
    data = mockZonesListResponse();
  } else {
    const res = await loudFetch(`${SERVER_URL}/zones`, {
      cache: 'no-store',
    });
    const body = await res.json();
    data = ZonesListResponseSchema.parse(body);
  }
  return data.flatMap((z) => z.members.map((m) => m.roomName));
}

/**
 * Get the player state from a Sonos zone
 */
export async function getZoneState(zone: string) {
  if (SERVER_URL === 'mock') {
    await wait(750);
    return mockZoneStateResponse();
  }
  const statePath = `${SERVER_URL}/${zone}/state`;
  const res = await loudFetch(statePath, { cache: 'no-store' });
  const body = await res.json();
  return ZoneStateResponseSchema.parse(body);
}

/**
 * Change something about the Sonos system
 */
export const sendSonosCommand = async ({
  zone,
  operation,
  param,
}: {
  zone: string;
  operation: string;
  param: string;
}) => {
  if (SERVER_URL === 'mock') {
    await wait(1000);
    console.log(`Mock operation: ${zone}/${operation}/${param}`);
  } else {
    return loudFetch(`${SERVER_URL}/${zone}/${operation}/${param}`, {
      cache: 'no-cache',
    });
  }
};
