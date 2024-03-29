import { Loader2 } from 'lucide-react';

const Loader = ({ className = '' }: { className?: string }) => {
	return <Loader2 className={`animate-spin h-8 w-8 ${className}`} />;
};

export default Loader;
