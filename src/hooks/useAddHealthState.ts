import { soldierHealthStateService } from '@/services/soldier-health-state';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useErrorToast } from './useErrorToast';
import { useSuccessToast } from './useSuccessToast';

export const useAddHealthState = (soldierId: string, resetForm: () => void) => {
	const { successToast } = useSuccessToast();
	const { errorToast } = useErrorToast();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationKey: ['add-soldier-health-state', soldierId],
		mutationFn: soldierHealthStateService.create,
		onSuccess: async () => {
			resetForm();
			successToast(
				`The #${soldierId} soldier health state was added successfully!`,
			);
			await queryClient.invalidateQueries({
				queryKey: ['soldier-health-states', soldierId],
			});
			navigate(`/soldiers/${soldierId}`);
		},
		onError: error => {
			errorToast(error);
		},
	});
};
