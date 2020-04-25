import { ILocationRepository } from '../types/ILocationRepository';
import {
	readFile,
	readdir,
	mapYamlFileNameToId,
} from './api-utility';
import yaml from 'yaml';
import fspath from 'path';
import { Location } from '../types/Location';

export class YamlLocationRepository implements ILocationRepository {
	private locationsPath: string;
	private knownPaths: string[];
	
	constructor(relativeLocationsPath: string) {
		this.locationsPath = fspath.join(fspath.resolve('./'), relativeLocationsPath);
	}

	public async init() {
		this.knownPaths = (await readdir(this.locationsPath)).filter(x => x !== 'map.json');
	}
	
	public async getPaths(): Promise<string[]> {
		return this.knownPaths;
	}

	public async getLocations(path: string): Promise<string[]> {
		if (!this.knownPaths.includes(path)) {
			return null;
		}

		return (await readdir(fspath.join(this.locationsPath, path))).map(x => mapYamlFileNameToId(x));
	}

	public async getLocation(path: string, location: string): Promise<Location> {
		if (!this.knownPaths.includes(path) || !location) {
			return null;
		}

		const locations = await this.getLocations(path);
		if (!locations.includes(location)) {
			return null;
		}

		const fileContents = await readFile(fspath.join(this.locationsPath, `${path}/${location}.yaml`), { encoding: 'utf8' });

		const parsedFile = yaml.parse(fileContents);

		if (!parsedFile) {
			return null;
		}

		parsedFile.id = location;
		return parsedFile as Location;
	}

	public async getNextLocation(path: string, location: string): Promise<Location> {
		if (!this.knownPaths.includes(path) || !location) {
			return null;
		}

		const locations = await this.getLocations(path);
		if (!locations.includes(location)) {
			return null;
		}

		const rawMapData = await readFile(fspath.join(this.locationsPath, 'map.json'), { encoding: 'utf8' });
		const map = JSON.parse(rawMapData) as { [key: string]: string[] };

		const index = map[path].findIndex(v => v === location);
		
		if (!map[path][index + 1]) {
			return null;
		}

		return await this.getLocation(path, map[path][index + 1]);
	}
}
