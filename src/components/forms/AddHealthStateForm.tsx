import { useAddHealthState } from '@/hooks/useAddHealthState';
import { SoldierHealthStateForm } from '@/types/soldier';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Form from '../form/Form';
import FormButton from '../form/FormButton';
import FormItem from '../form/FormItem';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const addHealthStateValidationSchema = Yup.object().shape({
	soldierId: Yup.string().required('Soldier id is required'),
	weight: Yup.number()
		.required('Weight is required')
		.min(0, 'Weight must be greater than 0')
		.max(150, 'Weight must be less than 150')
		.typeError('Weight must be a number'),
	pressure: Yup.number()
		.required('Pressure is required')
		.min(0, 'Pressure must be greater than 0')
		.max(300, 'Pressure must be less than 300')
		.typeError('Pressure must be a number'),
	pulse: Yup.number()
		.required('Pulse is required')
		.min(0, 'Pulse must be greater than 0')
		.max(300, 'Pulse must be less than 300')
		.typeError('Pulse must be a number'),
	temperature: Yup.number()
		.required('Temperature is required')
		.min(30, 'Temperature must be greater than 30')
		.max(45, 'Temperature must be less than 45')
		.typeError('Temperature must be a number'),
	additionalInfo: Yup.string()
		.required('Additional info is required')
		.min(5, 'Additional info must be at least 5 characters long')
		.max(500, 'Additional info must be less than 500 characters long'),
});

const AddHealthStateForm = ({ soldierId }: { soldierId: string }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<SoldierHealthStateForm>({
		mode: 'onChange',
		resolver: yupResolver(addHealthStateValidationSchema),
	});

	const { mutate: addHealthState, isPending } = useAddHealthState(
		soldierId,
		reset,
	);

	const onSubmit: SubmitHandler<SoldierHealthStateForm> = data => {
		addHealthState({
			...data,
			createdAt: new Date().toISOString(),
		});
	};

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<input type='hidden' {...register('soldierId')} value={soldierId} />

				<FormItem
					input={
						<Input placeholder='Weight' type='text' {...register('weight')} />
					}
					errorMessage={errors.weight?.message}
				/>
				<FormItem
					input={
						<Input
							placeholder='Pressure'
							type='text'
							{...register('pressure')}
						/>
					}
					errorMessage={errors.pressure?.message}
				/>
				<FormItem
					input={
						<Input placeholder='Pulse' type='text' {...register('pulse')} />
					}
					errorMessage={errors.pulse?.message}
				/>
				<FormItem
					input={
						<Input
							placeholder='Temperature'
							type='text'
							{...register('temperature')}
						/>
					}
					errorMessage={errors.temperature?.message}
				/>
				<FormItem
					input={
						<Textarea
							className='resize-none'
							placeholder='Additional info'
							{...register('additionalInfo')}
						/>
					}
					errorMessage={errors.additionalInfo?.message}
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

export default AddHealthStateForm;
