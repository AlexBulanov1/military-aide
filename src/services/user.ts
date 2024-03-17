import { Axios } from '@/axios';
import { User, UserWithId } from '@/types/user';

class UserService {
	private apiPrefix: string = '/users';

	public async getByUsername(username: string): Promise<UserWithId> {
		const { data: response } = await Axios.getInstance().get<UserWithId[]>(
			`${this.apiPrefix}?username=${username}`,
		);
		return response[0];
	}

	public async getByUsernameAndPassword(
		username: string,
		password: string,
	): Promise<UserWithId> {
		const { data: response } = await Axios.getInstance().get<UserWithId[]>(
			`${this.apiPrefix}?username=${username}&password=${password}`,
		);
		return response[0];
	}

	public async register(user: User): Promise<UserWithId> {
		const { data: response } = await Axios.getInstance().post<UserWithId>(
			this.apiPrefix,
			user,
		);
		return response;
	}
}

export const userService = new UserService();
