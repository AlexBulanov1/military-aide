import Container from '@/components/container/Container';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/user';
import { Link, useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

const Header = () => {
	const navigate = useNavigate();

	const { isCheckingAuthFinished, isAuthenticated, isLoading, logout } =
		useUserStore(
			useShallow(state => ({
				isCheckingAuthFinished: state.isCheckingAuthFinished,
				isAuthenticated: state.isAuthenticated,
				isLoading: state.isLoading,
				logout: state.logout,
				user: state.user,
			})),
		);

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	return (
		<header className='bg-primary py-2 h-[56px]'>
			<Container>
				<div className='flex gap-5 items-center justify-between'>
					<h2 className='text-2xl text-white'>
						<Link to={'/'}>
							<strong>Military</strong> Aide
						</Link>
					</h2>
					{isLoading || !isCheckingAuthFinished ? (
						''
					) : isAuthenticated ? (
						<div>
							<Button
								variant={'secondary'}
								onClick={handleLogout}
								type={'button'}>
								<span>Log out</span>
							</Button>
						</div>
					) : (
						<div className='flex items-center gap-3'>
							<Button type='button' variant={'secondary'}>
								<Link to={'/register'}>
									<span>Sign up</span>
								</Link>
							</Button>
							<Button type='button' variant={'secondary'}>
								<Link to={'/login'}>
									<span>Sign in</span>
								</Link>
							</Button>
						</div>
					)}
				</div>
			</Container>
		</header>
	);
};

export default Header;
