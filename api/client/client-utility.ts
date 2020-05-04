import axios from 'axios';

export async function fetchJson(url: string): Promise<any> {
	const response = await axios.get(url);

	if (response.status > 299) {
		throw new Error(`Unexpected response: ${response.status} - ${response.data.message}`);
	}

	return response.data;
}

export async function postJson(url: string, data: any): Promise<any> {
	const response = await axios.post(url, data);

	if (response.status > 299) {
		throw new Error(`Unexpected response: ${response.status} - ${response.data.message}`);
	}

	return response.data;
}

export async function postForm(url: string, data: FormData): Promise<any> {
	const response = await axios.post(url, data, {
		headers: {
			'Content-Type': 'multipart/form',
		}
	});

	if (response.status > 299) {
		throw new Error(`Unexpected response: ${response.status} - ${response.data.message}`);
	}

	return response.data;
}
