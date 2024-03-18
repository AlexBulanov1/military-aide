import Loader from '@/components/Loader';
import { useUserStore } from '@/store/user';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate();

	const { isLoading, isCheckingAuthFinished, isAuthenticated } = useUserStore(
		useShallow(state => ({
			isLoading: state.isLoading,
			isAuthenticated: state.isAuthenticated,
			isCheckingAuthFinished: state.isCheckingAuthFinished,
		})),
	);

	useEffect(() => {
		if (!isLoading) {
			if (!isAuthenticated && isCheckingAuthFinished) {
				navigate('/login');
			}
		}
	}, [isLoading, isCheckingAuthFinished, isAuthenticated, navigate]);

	if (isLoading || !isCheckingAuthFinished) {
		return (
			<div className='flex justify-center'>
				<Loader />
			</div>
		);
	}

	return children;
};

export default RequireAuth;
