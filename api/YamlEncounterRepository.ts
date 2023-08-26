import { GetEncounterResponse, IEncounterRepository } from '../types/IEncounterRepository';
import { Encounter } from '../types/Encounter';
import yaml from 'yaml';
import path from 'path';
import fs from 'fs/promises';

export class YamlEncounterRepository implements IEncounterRepository {
	private knownTypes: string[];
	private encountersPath: string;
	
	constructor(relativeEncountersPath: string) {
		this.encountersPath = path.join(path.resolve('./'), relativeEncountersPath);
	}

	public async init() {
		this.knownTypes = await fs.readdir(this.encountersPath);
	}

	public async getFinalEncounter(type: string): Promise<GetEncounterResponse> {
		if (!this.knownTypes.includes(type)) {
			return null;
		}

		return {
			encounter: await this.getEncounter(type, '_final'),
			clearPreviousEncounters: true,
		};
	}
	
	public async getRandomEncounter(previousEncounters: string[], type: string): Promise<GetEncounterResponse> {
		if (!this.knownTypes.includes(type)) {
			return null;
		}

		const typePath = path.join(this.encountersPath, type);
		const allEncounters = (await fs.readdir(typePath)).filter(x => x !== '_final.yaml');
		let availableEncounters = allEncounters.filter(x => !previousEncounters.includes(x.replace(/\.yaml/, '')));

		let clearPreviousEncounters = false;
		if (availableEncounters.length == 0) {
			availableEncounters = allEncounters;
			clearPreviousEncounters = true;
		}

		if (availableEncounters.length === 0) {
			return null;
		}

		const nextEncounter = availableEncounters[Math.floor(Math.random() * availableEncounters.length)];

		if (availableEncounters.length === 1) {
			clearPreviousEncounters = true;
		}

		const encounter = await this.getEncounter(type, nextEncounter.replace(/\.yaml/, ''));

		return {
			encounter,
			clearPreviousEncounters,
		}
	}

	private async getEncounter(type: string, id: string): Promise<Encounter> {
		const encounterPath = path.join(this.encountersPath, type, `${id}.yaml`);
		const contents = await fs.readFile(encounterPath, { encoding: 'utf8' });
		const parsed = yaml.parse(contents);

		if (!parsed) {
			return null;
		}

		parsed.encounterId = id;
		return parsed as Encounter;
	}
}
