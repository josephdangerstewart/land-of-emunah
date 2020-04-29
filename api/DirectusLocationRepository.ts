import { ILocationRepository } from '../types/ILocationRepository';
import { Location } from '../types/Location';
import axios from 'axios';

interface DirectusLocation {
	id: number;
	title: string;
	cover_image: number;
	description: string;
	path: string;
	is_first_location: boolean;
	next_location: number;
}

interface DirectusAsset {
	data: {
		url: string;
	};
}

export class DirectusLocationRepository implements ILocationRepository {
	private knownPaths = [];
	private baseUri = '';
	private imageUri = '';

	constructor(baseUri: string, imageUri: string) {
		this.knownPaths = [
			'desert',
			'forest',
			'mountains',
			'sea',
		];
		this.baseUri = baseUri;
		this.imageUri = imageUri;
	}
	
	public async getPaths(): Promise<string[]> {
		return this.knownPaths;
	}

	public async getLocations(path: string): Promise<string[]> {
		const response = (await axios.get(`${this.baseUri}/items/location?filter[path][eq]=${path}`)).data.data as DirectusLocation[];
		return response.map(x => x.id.toString());
	}

	public async getLocation(path: string, locationId: string): Promise<Location> {
		const locations = await this.getSortedLocationsForPath(path);
		const locationIndex = locations.findIndex(x => x.id.toString() === locationId);

		if (!locations[locationIndex]) {
			return null;
		}

		return await this.mapLocation(locations[locationIndex], !Boolean(locations[locationIndex + 1]));
	}

	public async getNextLocation(path: string, locationId?: string): Promise<Location> {
		const locations = await this.getSortedLocationsForPath(path);

		if (!locations.length) {
			return null;
		}
		
		if (!locationId) {
			return await this.mapLocation(locations[0], !Boolean(locations[1]));
		}

		const currentLocationIndex = locations.findIndex(x => x.id.toString() === locationId);
		
		if (!locations[currentLocationIndex + 1]) {
			return null;
		}

		return await this.mapLocation(locations[currentLocationIndex + 1], !Boolean(locations[currentLocationIndex + 2]));
	}

	private async getSortedLocationsForPath(path: string): Promise<DirectusLocation[]> {
		const mapId = (await axios.get(`${this.baseUri}/items/map?filter[path][eq]=${path}`)).data.data[0]?.id as number;
		return (await axios.get(`${this.baseUri}/items/location?filter[map_id][eq]=${mapId}&sort=sort,id`)).data.data as DirectusLocation[];
	}

	private async mapLocation(location: DirectusLocation, isLastInPath: boolean): Promise<Location> {
		const asset = (await axios.get(`${this.baseUri}/files/${location.cover_image}`)).data.data as DirectusAsset;

		return {
			id: location.id.toString(),
			name: location.title,
			description: location.description,
			coverImage: `${this.imageUri}${asset.data.url}`,
			path: location.path,
			isLastInPath,
		};
	}
}
