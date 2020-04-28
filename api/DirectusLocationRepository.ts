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
		const response = (await axios.get(`${this.baseUri}/items/location/${locationId}`)).data.data as DirectusLocation;
		return await this.mapLocation(response);
	}

	public async getNextLocation(path: string, locationId?: string): Promise<Location> {
		if (!locationId) {
			const firstLocations = (await axios.get(`${this.baseUri}/items/location?filter[is_first_location][eq]=1&filter[path][eq]=${path}`)).data.data as DirectusLocation[];
			const firstLocation = firstLocations[Math.floor(Math.random() * firstLocations.length)];
			return await this.mapLocation(firstLocation);
		}

		const currentLocation = await this.getLocation(path, locationId);

		if (!currentLocation?.nextLocationId) {
			return null;
		}

		return await this.getLocation(path, currentLocation.nextLocationId);
	}

	private async mapLocation(location: DirectusLocation): Promise<Location> {
		const asset = (await axios.get(`${this.baseUri}/files/${location.cover_image}`)).data.data as DirectusAsset;

		return {
			id: location.id.toString(),
			name: location.title,
			description: location.description,
			coverImage: `${this.imageUri}${asset.data.url}`,
			path: location.path,
			isLastInPath: !Boolean(location.next_location),
			nextLocationId: location.next_location?.toString() ?? null,
		};
	}
}
