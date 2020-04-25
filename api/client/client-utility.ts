import axios from 'axios';

export async function fetchJson(url: string): Promise<any> {
	const response = await axios.get(url);

	if (response.status > 299) {
		throw new Error(`Unexpected response: ${response.status} - ${response.data.message}`)
	}

	return response.data;
}
