import { soldierService } from '@/services/soldier';
import { useQuery } from '@tanstack/react-query';

export const useGetSoldiers = () => {
	return useQuery({
		queryKey: ['soldiers'],
		queryFn: async () => {
			const response = await soldierService.getAll();
			return response;
		},
		staleTime: 1000 * 30,
		retry: false,
	});
};
