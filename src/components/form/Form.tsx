import React from 'react';

type FormProps = {
	children: React.ReactNode;
	className?: string;
	onSubmit: () => void;
};

const Form = ({ children, onSubmit, className = '' }: FormProps) => {
	return (
		<form
			className={`max-w-[500px] m-auto flex flex-col gap-3 ${className}`}
			onSubmit={onSubmit}
			method='post'>
			{children}
		</form>
	);
};

export default Form;
