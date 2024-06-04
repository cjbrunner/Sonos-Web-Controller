"use client"

import {useState} from 'react';

const SERVER_URL = 'http://192.168.1.179:5005'

export const handleInput = async ({zone, operation, param}) => {
  fetch(`${SERVER_URL}/${zone}/${operation}/${param}`)
  .then(
    res => {
      console.log(res);
      return res
    }
  )
}

export async function getAllZones()  {
  try {
    const res = await fetch(`${SERVER_URL}/zones`)
    if (res.ok) {
      return await res.json();
    } else {
      console.error("Failed to fetch zones");
    }
  } catch (error) {
    console.error(error);
  }
}

export const useSonosInfo = () => {
  const [sonosInfo, setSonosInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getInfo = async (zone) => {
    try {
      setIsLoading(true);
      const statePath = `${SERVER_URL}/${zone}/state`
      const res = await fetch(statePath)
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
}
