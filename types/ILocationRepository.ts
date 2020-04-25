export interface ILocationRepository {
	getPaths(): Promise<string[]>;
	getLocations(path: string): Promise<string[]>;
	getLocation(path: string, location: string): Promise<Location>; 
}
