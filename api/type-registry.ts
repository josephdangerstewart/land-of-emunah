import { YamlEncounterRepository } from './YamlEncounterRepository';
import { IEncounterRepository } from '../types/IEncounterRepository';
import { ILocationRepository } from '../types/ILocationRepository';
import { YamlLocationRepository } from './YamlLocationRepository';

export async function getEncounterRepository(): Promise<IEncounterRepository> {
	const repository = new YamlEncounterRepository('./encounters');
	await repository.init();
	return repository;
}

export async function getLocationRepository(): Promise<ILocationRepository> {
	const repository = new YamlLocationRepository('./locations');
	await repository.init();
	return repository;
}
