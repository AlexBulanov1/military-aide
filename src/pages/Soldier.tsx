import HealthStatesList from '@/components/HealthStatesList';
import Loader from '@/components/Loader';
import Title from '@/components/Title';
import { useGetSoldierById } from '@/hooks/useGetSoldierById';
import { useGetSoldierHealthStates } from '@/hooks/useGetSoldierHealthStates';
import { useNavigate, useParams } from 'react-router-dom';

const Soldier = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	if (!id) {
		return navigate('/');
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
		return navigate('/error');
	}

	return (
		<div>
			{healthStates.length > 0 ? (
				<div>
					<Title className='!text-left text-5xl'>
						{soldier.name} {soldier.surname}'s health states
					</Title>
					<HealthStatesList healthStates={healthStates} />
				</div>
			) : (
				<Title className='text-5xl'>
					No health states found for <br /> {soldier.name} {soldier.surname}
				</Title>
			)}
		</div>
	);
};

export default Soldier;
