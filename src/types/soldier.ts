export type SoldierWithId = {
	name: string;
	surname: string;
	birthDate: string;
	phone: string;
	id: string;
	unit: string;
};

export type Soldier = Omit<SoldierWithId, 'id'>;

export type SoldierHealthStateWithId = {
	id: string;
	createdAt: string;
	soldierId: string;
	weight: number;
	pressure: number;
	pulse: number;
	temperature: number;
	additionalInfo: string;
};

export type SoldierHealthStateForm = Omit<
	SoldierHealthStateWithId,
	'id' | 'createdAt'
>;

export type SoldierHealthState = Omit<SoldierHealthStateWithId, 'id'>;
