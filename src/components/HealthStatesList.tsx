import { SoldierHealthState } from '@/types/soldier';
import HealthStateItem from './HealthStateItem';

type HealthStatesListProps = {
	healthStates: SoldierHealthState[];
};

const HealthStatesList = ({ healthStates }: HealthStatesListProps) => {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
			{healthStates.map(healthState => {
				return (
					<HealthStateItem key={healthState.id} healthState={healthState} />
				);
			})}
		</div>
	);
};

export default HealthStatesList;
