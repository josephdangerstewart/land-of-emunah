import { IEncounterRepository } from '../../types/IEncounterRepository';
import { Encounter } from '../../types/Encounter';
import { fetchJson } from './client-utility';

export class ClientEncounterRepository implements IEncounterRepository {
	public async getRandomEncounter(previousEncounters: string[], type: string, locationId: string): Promise<Encounter> {
		const pastEncountersParam = previousEncounters?.length ? `pastEncounters=${previousEncounters.join(',')}` : null;
		const locationIdParam = locationId ? `locationId=${locationId}` : null;

		const params = [
			pastEncountersParam,
			locationIdParam,
		].filter(Boolean);

		return (await fetchJson(`/api/encounters/${type}${params.length ? `?${params.join(',')}` : ''}`)).encounter as Encounter;
	}

	public async getFinalEncounter(type: string): Promise<Encounter> {
		return (await fetchJson(`/api/encounters/${type}/final`)).encounter as Encounter;
	}
}
