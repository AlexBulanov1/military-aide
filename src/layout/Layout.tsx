import Container from '@/components/container/Container';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Layout: FC = () => {
	return (
		<div className='wrapper'>
			<Header />
			<main>
				<Container>
					<Outlet />
				</Container>
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
