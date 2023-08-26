import { Encounter } from './Encounter';

export interface GetEncounterResponse {
	encounter: Encounter;
	clearPreviousEncounters: boolean;
}

export interface IEncounterRepository {
	getRandomEncounter(previousEncounters: string[], type: string, locationId: string): Promise<GetEncounterResponse>;
	getFinalEncounter(type: string): Promise<GetEncounterResponse>;
}
