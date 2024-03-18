import { Axios } from '@/axios';
import { SoldierHealthState } from '@/types/soldier';

class SoldierHealthStateService {
	private apiPrefix: string = '/soldiers-health-states';

	public getBySoldierId = async (
		soldierId: string,
	): Promise<SoldierHealthState[]> => {
		const { data: response } = await Axios.getInstance().get<
			SoldierHealthState[]
		>(`${this.apiPrefix}?soldierId=${soldierId}`);
		return response;
	};

	public delete = async (healthStateId: string): Promise<void> => {
		await Axios.getInstance().delete(`${this.apiPrefix}/${healthStateId}`);
	};
}

export const soldierHealthStateService = new SoldierHealthStateService();
