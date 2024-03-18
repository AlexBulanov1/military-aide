import { soldierService } from '@/services/soldier';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useErrorToast } from './useErrorToast';
import { useSuccessToast } from './useSuccessToast';

export const useAddSoldier = (resetForm: () => void) => {
	const { successToast } = useSuccessToast();
	const { errorToast } = useErrorToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['add-soldier'],
		mutationFn: soldierService.create,
		onSuccess: async () => {
			resetForm();
			successToast('The soldier was added successfully!');
			await queryClient.invalidateQueries({ queryKey: ['soldiers'] });
		},
		onError: error => {
			errorToast(error);
		},
	});
};
