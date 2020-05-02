import { ClientLocationRepository } from '../api/client/ClientLocationRepository';
import { ILocationRepository } from '../types/ILocationRepository';
import { IEncounterRepository } from '../types/IEncounterRepository';
import { ClientEncounterRepository } from '../api/client/ClientEncounterRepository';
import { ClientPromptRepository } from '../api/client/ClientPromptRepository';
import { IPromptRepository } from '../types/IPromptRepository';

export function getClientLocationRepository(): ILocationRepository {
	return new ClientLocationRepository();
}

export function getClientEncounterRepository(): IEncounterRepository {
	return new ClientEncounterRepository();
}

export function getClientPromptRepository(): IPromptRepository {
	return new ClientPromptRepository();
}
