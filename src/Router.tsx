import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequireAuth from './hoc/RequireAuth';
import WithoutAuth from './hoc/WithoutAuth';
import Layout from './layout/Layout';
import AddHealthState from './pages/AddHealthState';
import AddSoldier from './pages/AddSoldier';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Soldier from './pages/Soldier';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route
						element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						}
						index
					/>
					<Route
						path='/soldiers/:id'
						element={
							<RequireAuth>
								<Soldier />
							</RequireAuth>
						}
					/>
					<Route
						path='/add-health-state/:userId'
						element={
							<RequireAuth>
								<AddHealthState />
							</RequireAuth>
						}
					/>
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
					<Route path='error' element={<Error />} />
					<Route element={<NotFound />} path='*' />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
