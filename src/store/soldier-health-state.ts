import { create } from 'zustand';

type SoldierHealthStateStore = {
	currentPage: number;
	setCurrentPage: (page: number) => void;
	limit: number;
	setLimit: (limit: number) => void;
};

export const useSoldierHealthStateStore = create<SoldierHealthStateStore>(
	set => ({
		currentPage: 1,
		limit: 6,
		setCurrentPage: (page: number) => set(() => ({ currentPage: page })),
		setLimit: (limit: number) => set(() => ({ limit: limit })),
	}),
);
