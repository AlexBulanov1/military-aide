import { useAddHealthState } from '@/hooks/useAddHealthState';
import { SoldierHealthStateForm } from '@/types/soldier';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormButton from './FormButton';
import FormError from './FormError';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

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
			<form
				className='max-w-[500px] m-auto flex flex-col gap-3'
				onSubmit={handleSubmit(onSubmit)}
				method='post'>
				<input type='hidden' {...register('soldierId')} value={soldierId} />

				<div className='flex flex-col gap-1'>
					<Input placeholder='Weight' type='text' {...register('weight')} />
					<FormError message={errors.weight?.message} />
				</div>
				<div className='flex flex-col gap-1'>
					<Input placeholder='Pressure' type='text' {...register('pressure')} />
					<FormError message={errors.pressure?.message} />
				</div>
				<div className='flex flex-col gap-1'>
					<Input placeholder='Pulse' type='text' {...register('pulse')} />
					<FormError message={errors.pulse?.message} />
				</div>
				<div className='flex flex-col gap-1'>
					<Input
						placeholder='Temperature'
						type='text'
						{...register('temperature')}
					/>
					<FormError message={errors.temperature?.message} />
				</div>
				<div className='flex flex-col gap-1'>
					<Textarea
						className='resize-none'
						placeholder='Additional info'
						{...register('additionalInfo')}
					/>
					<FormError message={errors.additionalInfo?.message} />
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

export default AddHealthStateForm;
