export type User = {
	username: string;
	password: string;
	role: UserRole;
};

export type UserWithId = {
	id: string;
} & User;

export type UserRole = 'admin' | 'user';
