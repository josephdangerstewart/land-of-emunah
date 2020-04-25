import { IEncounterRepository } from '../types/IEncounterRepository';
import { Encounter } from '../types/Encounter';
import yaml from 'yaml';
import path from 'path';
import {
	readdir,
	readFile,
} from './api-utility';

export class YamlEncounterRepository implements IEncounterRepository {
	private knownTypes: string[];
	private encountersPath: string;
	
	constructor(relativeEncountersPath: string) {
		this.encountersPath = path.join(path.resolve('./'), relativeEncountersPath);
	}

	public async init() {
		this.knownTypes = await readdir(this.encountersPath);
	}
	
	public async getRandomEncounter(previousEncounters: string[], type: string): Promise<Encounter> {
		if (!this.knownTypes.includes(type)) {
			return null;
		}

		const typePath = path.join(this.encountersPath, type);
		const allEncounters = await readdir(typePath);
		let availableEncounters = allEncounters.filter(x => !previousEncounters.includes(x.replace(/\.yaml/, '')));

		if (availableEncounters.length == 0) {
			availableEncounters = allEncounters;
		}

		if (availableEncounters.length === 0) {
			return null;
		}

		const nextEncounter = availableEncounters[Math.floor(Math.random() * availableEncounters.length)];

		const fileContents = await readFile(path.join(typePath, nextEncounter), { encoding: 'utf8' });
		const parsedEncounter = yaml.parse(fileContents);

		if (!parsedEncounter) {
			return null;
		}

		parsedEncounter.encounterId = nextEncounter.replace(/\.yaml/, '');

		return parsedEncounter as Encounter;
	}
}
