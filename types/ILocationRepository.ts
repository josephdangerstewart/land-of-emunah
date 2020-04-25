import { Location } from '../types/Location';

export interface ILocationRepository {
	getPaths(): Promise<string[]>;
	getLocations(path: string): Promise<string[]>;
	getLocation(path: string, location: string): Promise<Location>; 
	getNextLocation(path: string, location: string): Promise<Location>;
}
