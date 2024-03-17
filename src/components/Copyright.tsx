const Copyright = ({ className = '' }: { className?: string }) => {
	return (
		<p className={className}>
			Copyright {new Date().getFullYear()} - Alex Bulanov
		</p>
	);
};

export default Copyright;
