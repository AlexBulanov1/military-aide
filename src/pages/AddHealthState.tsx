import AddHealthStateForm from '@/components/AddHealthStateForm';
import Title from '@/components/Title';
import { useNavigate, useParams } from 'react-router-dom';

const AddHealthState = () => {
	const { userId } = useParams();
	const navigate = useNavigate();

	if (!userId) {
		navigate('/');
		return;
	}

	return (
		<div>
			<Title>Add health state for soldier #{userId}</Title>

			<AddHealthStateForm soldierId={userId} />
		</div>
	);
};

export default AddHealthState;
