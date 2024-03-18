import { soldierHealthStateService } from '@/services/soldier-health-state';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useErrorToast } from './useErrorToast';
import { useSuccessToast } from './useSuccessToast';

export const useDeleteSoldierHealthState = (
	healthStateId: string,
	soldierId: string,
) => {
	const { successToast } = useSuccessToast();
	const { errorToast } = useErrorToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['delete-soldier-health-state', healthStateId],
		mutationFn: soldierHealthStateService.delete,
		onSuccess: async () => {
			successToast('The state health was deleted successfully!');
			await queryClient.invalidateQueries({
				queryKey: ['soldier-health-states', soldierId],
			});
		},
		onError: error => {
			errorToast(error);
		},
	});
};
