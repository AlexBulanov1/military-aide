import { useUserStore } from '@/store/user';
import { User } from '@/types/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useShallow } from 'zustand/react/shallow';
import Form from '../form/Form';
import FormItem from '../form/FormItem';
import Loader from '../ui/Loader';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const loginValidationSchema = Yup.object().shape({
	email: Yup.string().required('Email is required').email('Not valid email'),
	password: Yup.string().required('Password is required'),
});

type LoginUser = Omit<User, 'role'>;

const LoginForm = () => {
	const navigate = useNavigate();

	const { error, user, isLoading, login } = useUserStore(
		useShallow(state => ({
			error: state.error,
			register: state.register,
			user: state.user,
			isLoading: state.isLoading,
			login: state.login,
		})),
	);

	useEffect(() => {
		if (user) {
			reset();
			navigate('/');
		}
	}, [user]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<LoginUser>({
		mode: 'onChange',
		resolver: yupResolver(loginValidationSchema),
	});

	if (isLoading) {
		return (
			<div className='flex justify-center'>
				<Loader />
			</div>
		);
	}

	const onSubmit: SubmitHandler<LoginUser> = data => {
		login({
			email: data.email,
			password: data.password,
		});
	};

	return (
		<>
			{error && (
				<p className=' py-3 text-xl max-w-[500px] m-auto'>
					Error: <strong>{error}</strong>
				</p>
			)}
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormItem
					input={
						<Input placeholder='Email' type='email' {...register('email')} />
					}
					errorMessage={errors.email?.message}
				/>
				<FormItem
					input={
						<Input
							placeholder='Password'
							type='password'
							{...register('password')}
						/>
					}
					errorMessage={errors.password?.message}
				/>
				<Button className='w-full' disabled={!isValid} type='submit'>
					Login
				</Button>
			</Form>
		</>
	);
};

export default LoginForm;
