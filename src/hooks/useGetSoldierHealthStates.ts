import { soldierHealthStateService } from '@/services/soldier-health-state';
import { useQuery } from '@tanstack/react-query';

export const useGetSoldierHealthStates = (soldierId: string) => {
	return useQuery({
		queryKey: ['soldier-health-states', soldierId],
		queryFn: async () => {
			const response = await soldierHealthStateService.getBySoldierId(
				soldierId,
			);
			return response;
		},
		staleTime: 1000 * 30,
		retry: false,
	});
};
