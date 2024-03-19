import HealthStatesList from '@/components/HealthStatesList';
import Loader from '@/components/ui/Loader';
import Title from '@/components/ui/Title';
import { Button } from '@/components/ui/button';
import { useGetSoldierById } from '@/hooks/useGetSoldierById';
import { useGetSoldierHealthStates } from '@/hooks/useGetSoldierHealthStates';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Soldier = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	if (!id) {
		navigate('/');
		return;
	}

	const {
		data: soldier,
		isLoading: isSoldierLoading,
		isSuccess: isSoldierSuccess,
		isError: isSoldierError,
		isFetching: isSoldierFetching,
	} = useGetSoldierById(id);

	const {
		data: healthStates,
		isLoading: areHealthStatesLoading,
		isSuccess: areHealthStatesSuccess,
		isError: isHealthStatesError,
		isFetching: areHealthStatesFetching,
	} = useGetSoldierHealthStates(id);

	if (
		isSoldierLoading ||
		isSoldierFetching ||
		areHealthStatesLoading ||
		areHealthStatesFetching
	) {
		return (
			<div className='flex justify-center'>
				<Loader />
			</div>
		);
	}

	if (
		isSoldierError ||
		!isSoldierSuccess ||
		isHealthStatesError ||
		!areHealthStatesSuccess
	) {
		navigate('/error');
		return;
	}

	return (
		<div>
			{healthStates.length > 0 ? (
				<div>
					<div className='flex justify-between mb-5 gap-3 items-center'>
						<Title className='!text-left !m-0 text-5xl'>
							{soldier.name} {soldier.surname}'s health states
						</Title>
						<Link to={`/add-health-state/${soldier.id}`}>
							<Button className='text-lg'>Add health state</Button>
						</Link>
					</div>
					<HealthStatesList healthStates={healthStates} />
				</div>
			) : (
				<Title className='text-5xl'>
					No health states found for <br /> {soldier.name} {soldier.surname}{' '}
					<br />
					<Link className='underline' to={`/add-health-state/${soldier.id}`}>
						But you can add one
					</Link>
				</Title>
			)}
		</div>
	);
};

export default Soldier;
