import SoldiersList from '@/components/SoldiersList';
import Title from '@/components/ui/Title';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const Home = () => {
	const [searchName, setSearchName] = useState('');

	return (
		<div>
			<Title>Soldiers</Title>
			<div>
				<Input
					className='max-w-xs mb-6'
					type='text'
					placeholder='Search by name...'
					onBlur={e => setSearchName(e.target.value)}
				/>
			</div>
			<div>
				<SoldiersList searchName={searchName} />
			</div>
		</div>
	);
};

export default Home;
