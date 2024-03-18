import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useCurrentDate } from '@/hooks/useCurrentDate';
import { useGetSoldiers } from '@/hooks/useGetSoldiers';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const SoldiersList = () => {
	const { currentDate } = useCurrentDate();
	const navigate = useNavigate();

	const { data, isLoading, isSuccess, isError, isFetching } = useGetSoldiers();

	if (isLoading || isFetching) {
		return (
			<div className='flex justify-center'>
				<Loader />
			</div>
		);
	}

	if (isError || !isSuccess) {
		navigate('/error');
	}

	return (
		<Table>
			<TableCaption>Current soldiers list as of {currentDate}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px]'>ID</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Surname</TableHead>
					<TableHead>birthDate</TableHead>
					<TableHead>phone</TableHead>
					<TableHead className='text-right'>unit</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map(soldier => (
					<TableRow
						className='cursor-pointer'
						onClick={() => navigate(`/soldiers/${soldier.id}`)}
						key={soldier.id}>
						<TableCell className='font-medium'>{soldier.id}</TableCell>
						<TableCell>{soldier.name}</TableCell>
						<TableCell>{soldier.surname}</TableCell>
						<TableCell>{soldier.birthDate}</TableCell>
						<TableCell>{soldier.phone}</TableCell>
						<TableCell className='text-right'>{soldier.unit}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default SoldiersList;
