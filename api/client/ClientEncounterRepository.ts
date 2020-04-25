import { IEncounterRepository } from '../../types/IEncounterRepository';
import { Encounter } from '../../types/Encounter';
import { fetchJson } from './client-utility';

export class ClientEncounterRepository implements IEncounterRepository {
	public async getRandomEncounter(previousEncounters: string[], type: string): Promise<Encounter> {
		const pastEncountersParam = previousEncounters?.length ? `?pastEncounters=${previousEncounters.join(',')}` : '';
		return (await fetchJson(`/api/encounters/${type}${pastEncountersParam}`)).encounter as Encounter;
	}
}
