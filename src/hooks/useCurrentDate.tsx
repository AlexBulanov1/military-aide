import { getFormattedDate } from '@/utils';
import { useEffect, useState } from 'react';

export const useCurrentDate = () => {
	const [currentDate, setCurrentDate] = useState(getFormattedDate());

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentDate(getFormattedDate());
		}, 60 * 1000);
		return () => clearInterval(interval);
	}, []);

	return { currentDate };
};
