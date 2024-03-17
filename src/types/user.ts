export type User = {
	email: string;
	password: string;
	role: UserRole;
};

export type UserWithId = {
	id: string;
} & User;

export type UserRole = 'admin' | 'user';
