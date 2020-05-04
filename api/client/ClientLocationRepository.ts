import { ILocationRepository } from '../../types/ILocationRepository';
import { Location } from '../../types/Location';

interface ClientLocationRepositoryOptions {
	fetchJson: (url: string) => Promise<any>;
}

export class ClientLocationRepository implements ILocationRepository {
	private fetchJson: ClientLocationRepositoryOptions['fetchJson'];

	constructor({ fetchJson }: ClientLocationRepositoryOptions) {
		this.fetchJson = fetchJson;
	}
	
	public async getPaths(): Promise<string[]> {
		const { paths } = (await this.fetchJson('/api/locations')) as { paths: string[] };
		return paths;
	}
	
	public async getLocations(path: string): Promise<string[]> {
		const { locations } = (await this.fetchJson(`/api/locations/${path}`)) as { locations: string[] };
		return locations;
	}

	public async getLocation(path: string, location: string): Promise<Location> {
		const { location: locationDto } = (await this.fetchJson(`/api/locations/${path}/${location}`)) as { location: Location };
		return locationDto;
	}

	public async getNextLocation(path: string, location?: string): Promise<Location> {
		let route = `/api/locations/${path}/${location}/next`;
		if (!location) {
			route = `/api/locations/${path}/first`;
		}

		const { nextLocation } = (await this.fetchJson(route)) as { nextLocation: Location };
		return nextLocation;
	}
}
