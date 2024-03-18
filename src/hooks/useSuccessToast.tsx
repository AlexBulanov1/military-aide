import { useToast } from '@/components/ui/use-toast';

export const useSuccessToast = () => {
	const { toast } = useToast();

	const successToast = (message: string) => {
		return toast({
			variant: 'success',
			title: message,
		});
	};

	return { successToast };
};
