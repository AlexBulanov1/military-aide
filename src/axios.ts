import axios, { AxiosInstance } from 'axios';

const API_URL: string = 'http://localhost:3000';

export class Axios {
	private static instance: AxiosInstance;

	private constructor() {}

	public static getInstance(): AxiosInstance {
		if (!Axios.instance) {
			Axios.instance = axios.create({
				baseURL: API_URL,
			});
		}
		return Axios.instance;
	}
}
