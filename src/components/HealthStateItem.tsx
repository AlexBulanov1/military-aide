import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useDeleteSoldierHealthState } from '@/hooks/useDeleteSoldierHealthState';
import { SoldierHealthStateWithId } from '@/types/soldier';
import { formatDateAndTime } from '@/utils';
import { Trash } from 'lucide-react';
import Loader from './ui/Loader';
import { Button } from './ui/button';

type HealthStateItemProps = {
	healthState: SoldierHealthStateWithId;
};

const HealthStateItem = ({ healthState }: HealthStateItemProps) => {
	const { mutate: deleteHealthState, isPending } = useDeleteSoldierHealthState(
		healthState.id,
		healthState.soldierId,
	);

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
				<div className='flex w-full gap-3 justify-between items-center'>
					<div className='flex flex-col'>
						<p className='font-bold'>Additional info:</p>
						<p>{healthState.additionalInfo}</p>
					</div>
					<div>
						<Button className='w-14' type={'button'}>
							{isPending ? (
								<Loader />
							) : (
								<Trash
									onClick={() => deleteHealthState(healthState.id)}
									className='w-full h-full'
								/>
							)}
						</Button>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

export default HealthStateItem;
