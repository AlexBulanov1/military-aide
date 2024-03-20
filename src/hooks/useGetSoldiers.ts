import { soldierService } from '@/services/soldier';
import { useQuery } from '@tanstack/react-query';

export const useGetSoldiers = (searchName?: string) => {
	return useQuery({
		queryKey: ['soldiers', searchName],
		queryFn: async () => {
			const response = await soldierService.getAll(searchName);
			return response;
		},
		staleTime: 1000 * 30,
		retry: false,
		refetchInterval: 60 * 1000,
	});
};
