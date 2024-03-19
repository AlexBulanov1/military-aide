import { useAddSoldier } from '@/hooks/useAddSoldier';
import { Soldier } from '@/types/soldier';
import { PHONE_NUMBER_REGEXP } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Form from '../form/Form';
import FormButton from '../form/FormButton';
import FormItem from '../form/FormItem';
import { Input } from '../ui/input';

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
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormItem
					input={<Input placeholder='Name' type='text' {...register('name')} />}
					errorMessage={errors.name?.message}
				/>
				<FormItem
					input={
						<Input placeholder='Surname' type='text' {...register('surname')} />
					}
					errorMessage={errors.surname?.message}
				/>
				<FormItem
					input={
						<Input
							placeholder='Phone number, example: 0961231213'
							type='text'
							{...register('phone')}
						/>
					}
					errorMessage={errors.phone?.message}
				/>
				<FormItem
					input={
						<Input
							id='birthDate'
							placeholder='Birth date'
							type='date'
							{...register('birthDate')}
						/>
					}
					errorMessage={errors.birthDate?.message}
					label='Birth date'
				/>
				<FormItem
					input={<Input placeholder='Unit' type='text' {...register('unit')} />}
					errorMessage={errors.unit?.message}
				/>
				<FormButton
					isDisabled={!isValid}
					className='w-full'
					isLoading={isPending}>
					Add
				</FormButton>
			</Form>
		</>
	);
};

export default AddSoldierForm;
