import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export const useErrorToast = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	const errorToast = (error: Error) => {
		if (!error) {
			navigate('/error');
		}

		return toast({
			variant: 'destructive',
			title: error.message,
		});
	};

	return { errorToast };
};
