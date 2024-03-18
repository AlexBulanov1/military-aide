import { soldierService } from '@/services/soldier';
import { useMutation } from '@tanstack/react-query';
import { useErrorToast } from './useErrorToast';
import { useSuccessToast } from './useSuccessToast';

export const useAddSoldier = (resetForm: () => void) => {
	const { successToast } = useSuccessToast();
	const { errorToast } = useErrorToast();

	return useMutation({
		mutationKey: ['add-soldier'],
		mutationFn: soldierService.create,
		onSuccess: async () => {
			resetForm();
			successToast('The soldier was added successfully!');
		},
		onError: error => {
			errorToast(error);
		},
	});
};
