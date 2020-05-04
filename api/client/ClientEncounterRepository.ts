import { IEncounterRepository } from '../../types/IEncounterRepository';
import { Encounter } from '../../types/Encounter';

interface ClientEncounterRepositoryOptions {
	fetchJson: (url: string) => Promise<any>;
}

export class ClientEncounterRepository implements IEncounterRepository {
	private fetchJson: ClientEncounterRepositoryOptions['fetchJson'];

	constructor({ fetchJson }: ClientEncounterRepositoryOptions) {
		this.fetchJson = fetchJson;
	}
	
	public async getRandomEncounter(previousEncounters: string[], type: string, locationId: string): Promise<Encounter> {
		const pastEncountersParam = previousEncounters?.length ? `pastEncounters=${previousEncounters.join(',')}` : null;
		const locationIdParam = locationId ? `locationId=${locationId}` : null;

		const params = [
			pastEncountersParam,
			locationIdParam,
		].filter(Boolean);

		return (await this.fetchJson(`/api/encounters/${type}${params.length ? `?${params.join('&')}` : ''}`)).encounter as Encounter;
	}

	public async getFinalEncounter(type: string): Promise<Encounter> {
		return (await this.fetchJson(`/api/encounters/${type}/final`)).encounter as Encounter;
	}
}
