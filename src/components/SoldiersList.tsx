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
import { useDeleteSoldier } from '@/hooks/useDeleteSoldier';
import { useGetSoldiers } from '@/hooks/useGetSoldiers';
import { useNavigate } from 'react-router-dom';
import DeleteSoldierButton from './DeleteSoldierButton';
import Loader from './ui/Loader';
import Title from './ui/Title';

const SoldiersList = ({ search }: { search?: string }) => {
	const { currentDate } = useCurrentDate();
	const navigate = useNavigate();

	const { data, isLoading, isSuccess, isError, isFetching } =
		useGetSoldiers(search);

	const { mutate: deleteSoldier, isPending } = useDeleteSoldier();

	if (isLoading || isFetching) {
		return (
			<div className='flex justify-center'>
				<Loader />
			</div>
		);
	}

	if (isError || !isSuccess) {
		navigate('/error');
		return;
	}

	return data.length > 0 ? (
		<Table>
			<TableCaption>Current soldiers list as of {currentDate}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px]'>ID</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Surname</TableHead>
					<TableHead>birthDate</TableHead>
					<TableHead>phone</TableHead>
					<TableHead>unit</TableHead>
					<TableHead className='text-right'></TableHead>
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
						<TableCell>{soldier.unit}</TableCell>
						<TableCell className='text-right'>
							<DeleteSoldierButton soldierId={soldier.id} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	) : (
		<Title className='flex justify-center'>No soldiers found</Title>
	);
};

export default SoldiersList;
