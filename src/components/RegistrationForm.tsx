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

const registrationValidationSchema = Yup.object().shape({
	email: Yup.string().required('Email is required').email('Not valid email'),
	password: Yup.string()
		.required('Password is required')
		.min(5, 'Min password length is 5')
		.max(10, 'Max password length is 10'),
	confirmPassword: Yup.string()
		.required('Confirm password is required')
		.oneOf([Yup.ref('password')], 'Passwords must match'),
});

type RegistrationUser = Omit<
	{
		confirmPassword: string;
	} & User,
	'role'
>;

const RegistrationForm = () => {
	const navigate = useNavigate();

	const {
		error,
		register: registerUser,
		user,
		isLoading,
	} = useUserStore(
		useShallow(state => ({
			error: state.error,
			register: state.register,
			user: state.user,
			isLoading: state.isLoading,
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
	} = useForm<RegistrationUser>({
		mode: 'onChange',
		resolver: yupResolver(registrationValidationSchema),
	});

	if (isLoading) {
		return (
			<div className='flex justify-center'>
				<Loader />
			</div>
		);
	}

	const onSubmit: SubmitHandler<RegistrationUser> = data => {
		registerUser({
			email: data.email,
			password: data.password,
			role: 'user',
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

				<div className='flex flex-col gap-1'>
					<Input
						placeholder='Confirm password'
						type='password'
						{...register('confirmPassword')}
					/>
					<FormError message={errors.confirmPassword?.message} />
				</div>
				<Button className='w-full' disabled={!isValid} type='submit'>
					Register
				</Button>
			</form>
		</>
	);
};

export default RegistrationForm;
