import { soldierHealthStateService } from '@/services/soldier-health-state';
import { useQuery } from '@tanstack/react-query';

export const useGetSoldierHealthStates = (
	soldierId: string,
	limit: number,
	page: number,
) => {
	return useQuery({
		queryKey: ['soldier-health-states', soldierId, limit, page],
		queryFn: async () => {
			const response = await soldierHealthStateService.getBySoldierId(
				soldierId,
				limit,
				page,
			);
			return response;
		},
		staleTime: 1000 * 30,
		retry: false,
	});
};
