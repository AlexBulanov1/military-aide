import { soldierService } from '@/services/soldier';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useErrorToast } from './useErrorToast';
import { useSuccessToast } from './useSuccessToast';

export const useDeleteSoldier = () => {
	const { successToast } = useSuccessToast();
	const { errorToast } = useErrorToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: soldierService.delete,
		onSuccess: async () => {
			successToast('The soldier was deleted successfully!');
			await queryClient.invalidateQueries({
				queryKey: ['soldiers'],
			});
		},
		onError: error => {
			errorToast(error);
		},
	});
};
