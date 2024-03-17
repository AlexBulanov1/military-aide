import Copyright from '@/components/Copyright';
import Container from '@/components/container/Container';

const Footer = () => {
	return (
		<footer className='py-3 bg-primary'>
			<Container>
				<Copyright className='text-center font-medium text-white' />
			</Container>
		</footer>
	);
};

export default Footer;
