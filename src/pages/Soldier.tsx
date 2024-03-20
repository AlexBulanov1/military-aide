import HealthStatesList from '@/components/HealthStatesList';
import Loader from '@/components/ui/Loader';
import Title from '@/components/ui/Title';
import { Button } from '@/components/ui/button';
import { useGetSoldierById } from '@/hooks/useGetSoldierById';
import { useGetSoldierHealthStates } from '@/hooks/useGetSoldierHealthStates';
import { useSoldierHealthStateStore } from '@/store/soldier-health-state';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

const Soldier = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { currentPage, limit, setCurrentPage } = useSoldierHealthStateStore(
		useShallow(state => ({
			currentPage: state.currentPage,
			limit: state.limit,
			setCurrentPage: state.setCurrentPage,
		})),
	);

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
	} = useGetSoldierHealthStates(id, limit, currentPage);

	console.log('healthStates', healthStates);

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
			{healthStates.data.length > 0 ? (
				<div>
					<div className='flex justify-between mb-5 gap-3 items-center'>
						<Title className='!text-left !m-0 text-5xl'>
							{soldier.name} {soldier.surname}'s health states
						</Title>
						<Link to={`/add-health-state/${soldier.id}`}>
							<Button className='text-lg'>Add health state</Button>
						</Link>
					</div>
					<HealthStatesList healthStates={healthStates.data} />
					<div className='flex justify-center my-10'>
						<PaginationControl
							page={currentPage}
							limit={limit}
							total={healthStates.count}
							last={true}
							next={true}
							changePage={page => {
								setCurrentPage(page);
							}}
						/>
					</div>
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
