import { Axios } from '@/axios';
import { SoldierHealthState, SoldierHealthStateWithId } from '@/types/soldier';
import { AxiosError } from 'axios';

// json-server api response type
type GetBySoldierIdResponse = {
	data: SoldierHealthStateWithId[];
	items: number;
	prev: number;
	next: number;
	last: number;
	pages: number;
};

class SoldierHealthStateService {
	private apiPrefix: string = '/soldiers-health-states';

	public getBySoldierId = async (
		soldierId: string,
		limit: number,
		page: number,
	): Promise<{ data: SoldierHealthStateWithId[]; count: number }> => {
		const { data: response } =
			await Axios.getInstance().get<GetBySoldierIdResponse>(
				`${this.apiPrefix}?soldierId=${soldierId}&_page=${page}&_per_page=${limit}`,
			);

		return { data: response.data, count: response.items };
	};

	public create = async (
		soldier: SoldierHealthState,
	): Promise<SoldierHealthStateWithId> => {
		const { data: response } =
			await Axios.getInstance().post<SoldierHealthStateWithId>(
				this.apiPrefix,
				soldier,
			);

		return response;
	};

	public delete = async (healthStateId: string): Promise<void> => {
		await Axios.getInstance().delete(`${this.apiPrefix}/${healthStateId}`);
	};

	public deleteBySoldierId = async (soldierId: string): Promise<void> => {
		try {
			await Axios.getInstance().delete(
				`${this.apiPrefix}?soldierId=${soldierId}`,
			);
		} catch (error) {
			const axiosError = error as AxiosError;

			// issue with json-server, it returns 404 when no records found even on delete
			if (axiosError && axiosError.response?.status !== 404) {
				throw error;
			}
		}
	};
}

export const soldierHealthStateService = new SoldierHealthStateService();
