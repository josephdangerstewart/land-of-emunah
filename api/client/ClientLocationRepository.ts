import { ILocationRepository } from '../../types/ILocationRepository';
import { Location } from '../../types/Location';
import { fetchJson } from './client-utility';

export class ClientLocationRepository implements ILocationRepository {
	public async getPaths(): Promise<string[]> {
		const { paths } = (await fetchJson('/api/locations')) as { paths: string[] };
		return paths;
	}
	
	public async getLocations(path: string): Promise<string[]> {
		const { locations } = (await fetchJson(`/api/locations/${path}`)) as { locations: string[] };
		return locations;
	}

	public async getLocation(path: string, location: string): Promise<Location> {
		const { location: locationDto } = (await fetchJson(`/api/locations/${path}/${location}`)) as { location: Location };
		return locationDto;
	}

	public async getNextLocation(path: string, location?: string): Promise<Location> {
		let route = `/api/locations/${path}/${location}/next`;
		if (!location) {
			route = `/api/locations/${path}/first`;
		}

		const { nextLocation } = (await fetchJson(route)) as { nextLocation: Location };
		return nextLocation;
	}
}
