import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { SoldierHealthState } from '@/types/soldier';
import { formatDateAndTime } from '@/utils';

type HealthStateItemProps = {
	healthState: SoldierHealthState;
};

const HealthStateItem = ({ healthState }: HealthStateItemProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex justify-between items-center gap-5 text-xl font-medium'>
					<p>#{healthState.id}</p>
					<p>{formatDateAndTime(healthState.createdAt)}</p>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex gap-2 justify-between items-center'>
					<p>Pressure:</p>
					<p className='font-bold'>{healthState.pressure} mm Hg</p>
				</div>
				<div className='flex gap-2 justify-between items-center'>
					<p>Pulse:</p>
					<p className='font-bold'>{healthState.pulse} bpm</p>
				</div>
				<div className='flex gap-2 justify-between items-center'>
					<p>Temperature:</p>
					<p className='font-bold'>{healthState.temperature} &#176;</p>
				</div>
				<div className='flex gap-2 justify-between items-center'>
					<p>Weight:</p>
					<p className='font-bold'>{healthState.weight} kg</p>
				</div>
			</CardContent>
			<CardFooter>
				<div className='flex flex-col'>
					<p className='font-bold'>Additional info:</p>
					<p>{healthState.additionalInfo}</p>
				</div>
			</CardFooter>
		</Card>
	);
};

export default HealthStateItem;
