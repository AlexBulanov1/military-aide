import React from 'react';
import { Label } from '../ui/label';
import FormError from './FormError';

type FormItemProps = {
	input: React.ReactNode;
	label?: string;
	errorMessage?: string;
	className?: string;
};

const FormItem = ({
	input,
	label,
	errorMessage,
	className = '',
}: FormItemProps) => {
	return (
		<div className={`flex flex-col gap-1 ${className}`}>
			{label && (
				<Label className='ml-3' htmlFor='birthDate'>
					{label}
				</Label>
			)}
			{input}
			<FormError message={errorMessage} />
		</div>
	);
};

export default FormItem;
