import SoldiersList from '@/components/SoldiersList';
import Title from '@/components/Title';

const Home = () => {
	return (
		<div>
			<Title>Soldiers</Title>
			<div>
				<SoldiersList />
			</div>
		</div>
	);
};

export default Home;
