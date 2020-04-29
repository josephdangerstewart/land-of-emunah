import { Encounter } from './Encounter';

export interface IEncounterRepository {
	getRandomEncounter(previousEncounters: string[], type: string, locationId: string): Promise<Encounter>;
	getFinalEncounter(type: string): Promise<Encounter>;
}
