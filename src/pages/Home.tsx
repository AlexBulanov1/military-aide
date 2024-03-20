import SoldiersList from '@/components/SoldiersList';
import Title from '@/components/ui/Title';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const Home = () => {
	const [search, setSearch] = useState('');

	return (
		<div>
			<Title>Soldiers</Title>
			<div>
				<Input
					className='max-w-xs mb-6'
					type='text'
					placeholder='Search...'
					onBlur={e => setSearch(e.target.value)}
				/>
			</div>
			<div>
				<SoldiersList search={search} />
			</div>
		</div>
	);
};

export default Home;
