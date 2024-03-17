import Loader from '@/components/Loader';
import { useUserStore } from '@/store/user';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

const WithoutAuth = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate();

	const { isLoading, isCheckingAuthFinished, isAuthenticated } = useUserStore(
		useShallow(state => ({
			isLoading: state.isLoading,
			isAuthenticated: state.isAuthenticated,
			isCheckingAuthFinished: state.isCheckingAuthFinished,
		})),
	);

	if (isLoading || !isCheckingAuthFinished) {
		return (
			<div className='flex justify-center'>
				<Loader />
			</div>
		);
	}

	if (isAuthenticated && isCheckingAuthFinished) {
		navigate('/');
	}

	return children;
};

export default WithoutAuth;
