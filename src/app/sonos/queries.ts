import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getZonesList, getZoneState, sendSonosCommand } from './actions';

export const usePlayPauseMutation = (zone: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['playpause', zone],
    mutationFn: () =>
      sendSonosCommand({ zone, operation: 'playpause', param: '' }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['currentZoneState', zone] });
    },
  });
};

export const useNextMutation = (zone: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['next', zone],
    mutationFn: () => sendSonosCommand({ zone, operation: 'next', param: '' }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['currentZoneState', zone] });
    },
  });
};

export const usePreviousMutation = (zone: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['previous', zone],
    mutationFn: () =>
      sendSonosCommand({ zone, operation: 'previous', param: '' }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['currentZoneState', zone] });
    },
  });
};

export const useSetVolumeMutation = (zone: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['setVolume', zone],
    mutationFn: ({ volume }: { volume: number }) =>
      sendSonosCommand({
        zone,
        operation: 'setVolume',
        param: volume.toString(),
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['currentZoneState', zone] });
    },
  });
};

export const useZoneStateQuery = (zone: string) => {
  return useQuery({
    queryKey: ['currentZoneState', zone],
    queryFn: async () => getZoneState(zone),
    staleTime: 3000,
  });
};

export const useZoneListQuery = () => {
  return useQuery({
    queryKey: ['zones'],
    queryFn: async () => getZonesList(),
  });
};
