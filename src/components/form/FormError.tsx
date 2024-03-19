type FormErrorProps = { message?: string; className?: string };

const FormError = ({ message, className = '' }: FormErrorProps) => {
	return message ? (
		<p className={`${className} text-[#ed4337] text-bold`}>{message}</p>
	) : null;
};

export default FormError;
