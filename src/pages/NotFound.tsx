import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<h1 className='text-center font-bold text-5xl'>
			Oops... <br />
			The page you are looking for was not found
			<br />
			<Link className='underline' to={'/'}>
				Navigate to the home page
			</Link>
		</h1>
	);
};

export default NotFound;
