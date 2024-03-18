import { Axios } from '@/axios';
import { Soldier, SoldierWithId } from '@/types/soldier';

class SoldierService {
	private apiPrefix: string = '/soldiers';

	public create = async (soldier: Soldier): Promise<SoldierWithId> => {
		const existingSoldier = await this.getByPhone(soldier.phone);
		if (existingSoldier) {
			throw new Error(
				`Soldier with ${soldier.phone} phone number already exists`,
			);
		}

		const { data: response } = await Axios.getInstance().post<SoldierWithId>(
			this.apiPrefix,
			soldier,
		);

		return response;
	};

	public getAll = async (): Promise<SoldierWithId[]> => {
		const { data: response } = await Axios.getInstance().get<SoldierWithId[]>(
			this.apiPrefix,
		);
		return response;
	};

	public getByPhone = async (phone: string): Promise<SoldierWithId> => {
		const { data: response } = await Axios.getInstance().get<SoldierWithId[]>(
			`${this.apiPrefix}?phone=${phone}`,
		);
		return response[0];
	};
}

export const soldierService = new SoldierService();
