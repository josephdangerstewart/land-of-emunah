import { Encounter } from './Encounter';

export interface IEncounterRepository {
	getRandomEncounter(previousEncounters: string[], type: string): Promise<Encounter>;
}
