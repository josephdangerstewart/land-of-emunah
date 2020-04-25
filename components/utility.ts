import { ClientLocationRepository } from '../api/client/ClientLocationRepository';
import { ILocationRepository } from '../types/ILocationRepository';
import { IEncounterRepository } from '../types/IEncounterRepository';
import { ClientEncounterRepository } from '../api/client/ClientEncounterRepository';

export function getClientLocationRepository(): ILocationRepository {
	return new ClientLocationRepository();
}

export function getClientEncounterRepository(): IEncounterRepository {
	return new ClientEncounterRepository();
}
