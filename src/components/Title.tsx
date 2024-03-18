import React from 'react';

const Title = ({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<h1 className={`text-center text-4xl mb-5 font-bold ${className}`}>
			{children}
		</h1>
	);
};

export default Title;
