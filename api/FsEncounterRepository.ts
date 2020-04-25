import { IEncounterRepository } from '../types/IEncounterRepository';
import { Encounter } from '../types/Encounter';
import yaml from 'yaml';
import fs from 'fs';
import path from 'path';
import util from 'util';

const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);

export class FsEncounterRepository implements IEncounterRepository {
	private knownTypes: string[];
	private encountersPath: string;
	
	constructor() {
		this.encountersPath = path.join(path.resolve('./'), 'encounters');
	}

	public async init() {
		this.knownTypes = await readdir(this.encountersPath);
	}
	
	public async getRandomEncounter(previousEncounters: string[], type: string): Promise<Encounter> {
		if (!this.knownTypes.includes(type)) {
			return null;
		}

		console.log(previousEncounters);

		const typePath = path.join(this.encountersPath, type);
		const knownEncounters = (await readdir(typePath)).filter(x => !previousEncounters.includes(x.replace(/\.yaml/, '')));

		if (knownEncounters.length === 0) {
			return null;
		}

		const nextEncounter = knownEncounters[Math.floor(Math.random() * knownEncounters.length)];

		const fileContents = await readFile(path.join(typePath, nextEncounter), { encoding: 'utf8' });
		const parsedEncounter = yaml.parse(fileContents);

		if (!parsedEncounter) {
			return null;
		}

		parsedEncounter.encounterId = nextEncounter.replace(/\.yaml/, '');

		return parsedEncounter as Encounter;
	}
}
