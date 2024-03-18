export type SoldierWithId = {
	name: string;
	surname: string;
	birthDate: string;
	phone: string;
	id: string;
	unit: string;
};

export type Soldier = Omit<SoldierWithId, 'id'>;
