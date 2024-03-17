import { useUserStore } from '@/store/user';
import { User } from '@/types/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useShallow } from 'zustand/react/shallow';
import FormError from './FormError';
import Loader from './Loader';
import { Button } from './ui/button';
import { Input } from './ui/input';

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
			<form
				className='max-w-[500px] m-auto flex flex-col gap-3'
				onSubmit={handleSubmit(onSubmit)}
				method='post'>
				<div className='flex flex-col gap-1'>
					<Input placeholder='Email' type='email' {...register('email')} />
					<FormError message={errors.email?.message} />
				</div>
				<div className='flex flex-col gap-1'>
					<Input
						placeholder='Password'
						type='password'
						{...register('password')}
					/>
					<FormError message={errors.password?.message} />
				</div>
				<Button className='w-full' disabled={!isValid} type='submit'>
					Login
				</Button>
			</form>
		</>
	);
};

export default LoginForm;
