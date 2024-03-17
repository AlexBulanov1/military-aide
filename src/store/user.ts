import { userService } from '@/services/user';
import { isAdminEmail } from '@/utils';
import { create } from 'zustand';
import type { User, UserWithId } from '../types/user';

type UserStore = {
	user: UserWithId | null;
	isLoading: boolean;
	error: string;
	isAuthenticated: boolean;
	isCheckingAuthFinished: boolean;
	setCredentials: (user: UserWithId) => void;
	logout: () => void;
	setIsCheckingAuthFinished: (isFinished: boolean) => void;
	register: (user: User) => void;
	login: (user: Omit<User, 'role'>) => void;
};

export const useUserStore = create<UserStore>(set => ({
	isLoading: false,
	error: '',
	user: null,
	isAuthenticated: false,
	isCheckingAuthFinished: false,
	setCredentials: (user: UserWithId) => {
		set({ user: user, isAuthenticated: true });
		localStorage.setItem('user', JSON.stringify(user));
	},
	logout: () => {
		set({ user: null, isAuthenticated: false, error: '' });
		localStorage.removeItem('user');
	},
	setIsCheckingAuthFinished: (isFinished: boolean) => {
		set({ isCheckingAuthFinished: isFinished });
	},
	register: async (user: User) => {
		set({ isLoading: true });
		try {
			const candidate = await userService.getByEmail(user.email);

			if (candidate) {
				set({
					error: `User with email ${user.email} already exists`,
				});
				return;
			}

			// Just mock functionality to prevent registering non-admin users
			if (!isAdminEmail(user.email, 'military')) {
				set({
					error: `User with email ${user.email} can't be registered`,
					isAuthenticated: false,
					user: null,
				});
				localStorage.removeItem('user');

				return;
			}

			const newUser = await userService.register({ ...user, role: 'admin' });
			set({ user: newUser, isAuthenticated: true, error: '' });
			localStorage.setItem('user', JSON.stringify(newUser));
		} catch (error) {
			set({
				error: 'Invalid register operation',
				isAuthenticated: false,
				user: null,
			});
			localStorage.removeItem('user');
		} finally {
			set({ isLoading: false });
		}
	},
	login: async (user: Omit<User, 'role'>) => {
		set({ isLoading: true });
		try {
			const candidate = await userService.getByEmailAndPassword(
				user.email,
				user.password,
			);

			if (!candidate) {
				set({
					error: 'User not found',
				});
				return;
			}

			set({
				user: candidate,
				isAuthenticated: true,
				error: '',
			});
			localStorage.setItem('user', JSON.stringify(candidate));
		} catch (error) {
			set({
				error: 'Invalid login operation',
				isAuthenticated: false,
				user: null,
			});
			localStorage.removeItem('user');
		} finally {
			set({ isLoading: false });
		}
	},
}));
