export type SoldierWithId = {
	name: string;
	surname: string;
	birthDate: string;
	phone: string;
	id: string;
	unit: string;
};

export type Soldier = Omit<SoldierWithId, 'id'>;

export type SoldierHealthState = {
	id: string;
	createdAt: string;
	soldierId: string;
	weight: number;
	pressure: number;
	pulse: number;
	temperature: number;
	additionalInfo: string;
};
