import { useDeleteSoldier } from '@/hooks/useDeleteSoldier';
import { Trash } from 'lucide-react';
import Loader from './ui/Loader';
import { Button } from './ui/button';

const DeleteSoldierButton = ({ soldierId }: { soldierId: string }) => {
	const { mutate: deleteSoldier, isPending } = useDeleteSoldier();

	return (
		<Button type='button' onClick={e => e.stopPropagation()} className='w-14'>
			{isPending ? (
				<Loader />
			) : (
				<Trash
					className='w-full h-full'
					onClick={() => deleteSoldier(soldierId)}
				/>
			)}
		</Button>
	);
};

export default DeleteSoldierButton;
