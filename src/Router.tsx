import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route path='register' element={<Register />} />
					<Route element={<NotFound />} path='*' />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;