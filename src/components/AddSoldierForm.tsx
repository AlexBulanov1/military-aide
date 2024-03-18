import { useAddSoldier } from '@/hooks/useAddSoldier';
import { Soldier } from '@/types/soldier';
import { PHONE_NUMBER_REGEXP } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormButton from './FormButton';
import FormError from './FormError';
import { Input } from './ui/input';

const addSoldierValidationSchema = Yup.object().shape({
	name: Yup.string()
		.required('Name is required')
		.min(2, 'Min name length is 2')
		.max(50, 'Max password length is 50'),
	surname: Yup.string()
		.required('Surname is required')
		.min(2, 'Min surname length is 2')
		.max(50, 'Max surname length is 50'),
	birthDate: Yup.string().required('Birth date is required'),
	unit: Yup.string()
		.required('Unit is required')
		.min(5, 'Min unit length is 5')
		.max(150, 'Max unit length is 150'),
	phone: Yup.string()
		.required('Phone is required')
		.matches(PHONE_NUMBER_REGEXP, 'Phone must be in an appropriate format'),
});

const AddSoldierForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<Soldier>({
		mode: 'onChange',
		resolver: yupResolver(addSoldierValidationSchema),
	});

	const { mutate: addSoldier, isPending } = useAddSoldier(reset);

	const onSubmit: SubmitHandler<Soldier> = data => {
		addSoldier(data);
	};

	return (
		<>
			<form
				className='max-w-[500px] m-auto flex flex-col gap-3'
				onSubmit={handleSubmit(onSubmit)}
				method='post'>
				<div className='flex flex-col gap-1'>
					<Input placeholder='Name' type='text' {...register('name')} />
					<FormError message={errors.name?.message} />
				</div>
				<div className='flex flex-col gap-1'>
					<Input placeholder='Surname' type='text' {...register('surname')} />
					<FormError message={errors.surname?.message} />
				</div>
				<div className='flex flex-col gap-1'>
					<Input
						placeholder='Phone number, example: 0961231213'
						type='text'
						{...register('phone')}
					/>
					<FormError message={errors.phone?.message} />
				</div>
				<div className='flex flex-col gap-1'>
					<Input
						placeholder='Birth date'
						type='date'
						{...register('birthDate')}
					/>
					<FormError message={errors.birthDate?.message} />
				</div>
				<div className='flex flex-col gap-1'>
					<Input placeholder='Unit' type='text' {...register('unit')} />
					<FormError message={errors.unit?.message} />
				</div>
				<FormButton
					isDisabled={!isValid}
					className='w-full'
					isLoading={isPending}>
					Add
				</FormButton>
			</form>
		</>
	);
};

export default AddSoldierForm;
