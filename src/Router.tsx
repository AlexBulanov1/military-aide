import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WithoutAuth from './hoc/WithoutAuth';
import Layout from './layout/Layout';
import AddSoldier from './pages/AddSoldier';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route
						path='register'
						element={
							<WithoutAuth>
								<Register />
							</WithoutAuth>
						}
					/>
					<Route
						path='login'
						element={
							<WithoutAuth>
								<Login />
							</WithoutAuth>
						}
					/>
					<Route path='add-soldier' element={<AddSoldier />} />
					<Route element={<NotFound />} path='*' />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
