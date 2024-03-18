import { soldierService } from '@/services/soldier';
import { useQuery } from '@tanstack/react-query';

export const useGetSoldierById = (soldierId: string) => {
	return useQuery({
		queryKey: ['soldiers', soldierId],
		queryFn: async () => {
			const response = await soldierService.getById(soldierId);
			return response;
		},
		staleTime: 1000 * 30,
		retry: false,
	});
};
