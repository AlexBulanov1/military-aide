import Title from '@/components/Title';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<Title>
			Oops... <br />
			The page you are looking for was not found
			<br />
			<Link className='underline' to={'/'}>
				Navigate to the home page
			</Link>
		</Title>
	);
};

export default NotFound;
