import { soldierService } from '@/services/soldier';
import { useQuery } from '@tanstack/react-query';

export const useGetSoldiers = (search?: string) => {
	return useQuery({
		queryKey: ['soldiers', search],
		queryFn: async () => {
			const response = await soldierService.getAll(search);
			return response;
		},
		staleTime: 1000 * 30,
		retry: false,
		refetchInterval: 60 * 1000,
	});
};
