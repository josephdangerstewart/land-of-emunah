import { ILocationRepository } from '../types/ILocationRepository';
import {
	mapYamlFileNameToId,
} from './api-utility';
import yaml from 'yaml';
import fs from 'fs/promises';
import fspath from 'path';
import { Location } from '../types/Location';

interface IMap {
	[key: string]: string[];
}

export class YamlLocationRepository implements ILocationRepository {
	private locationsPath: string;
	private knownPaths: string[];
	private map: IMap;

	constructor(relativeLocationsPath: string) {
		this.locationsPath = fspath.join(fspath.resolve('./'), relativeLocationsPath);
	}

	public async init(): Promise<void> {
		this.knownPaths = (await fs.readdir(this.locationsPath)).filter(x => x !== 'map.json');

		const rawMapData = await fs.readFile(fspath.join(this.locationsPath, 'map.json'), { encoding: 'utf8' });
		this.map = JSON.parse(rawMapData) as IMap;
	}

	public async getPaths(): Promise<string[]> {
		return this.knownPaths;
	}

	public async getLocations(path: string): Promise<string[]> {
		if (!this.knownPaths.includes(path)) {
			return null;
		}

		return (await fs.readdir(fspath.join(this.locationsPath, path))).map(x => mapYamlFileNameToId(x));
	}

	public async getLocation(path: string, location: string): Promise<Location> {
		if (!this.knownPaths.includes(path) || !location) {
			return null;
		}

		const locations = await this.getLocations(path);
		if (!locations.includes(location)) {
			return null;
		}

		const fileContents = await fs.readFile(fspath.join(this.locationsPath, `${path}/${location}.yaml`), { encoding: 'utf8' });

		const parsedFile = yaml.parse(fileContents);

		if (!parsedFile) {
			return null;
		}

		parsedFile.id = location;
		parsedFile.path = path;

		if (this.getMapIndex(path, location) === this.map[path].length - 1) {
			parsedFile.isLastInPath = true;
		} else {
			parsedFile.isLastInPath = false;
		}

		return parsedFile as Location;
	}

	public async getNextLocation(path: string, location?: string): Promise<Location> {
		if (!this.knownPaths.includes(path)) {
			return null;
		}

		const locations = await this.getLocations(path);
		if (location && !locations.includes(location)) {
			return null;
		}

		if (!location) {
			return await this.getLocation(path, this.map[path][0]);
		}

		const index = this.getMapIndex(path, location);

		if (!this.map[path][index + 1]) {
			return null;
		}

		return await this.getLocation(path, this.map[path][index + 1]);
	}

	private getMapIndex(path: string, location: string) {
		return this.map[path].findIndex(v => v === location);
	}
}
