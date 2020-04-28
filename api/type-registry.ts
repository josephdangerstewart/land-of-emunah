import { YamlEncounterRepository } from './YamlEncounterRepository';
import { IEncounterRepository } from '../types/IEncounterRepository';
import { ILocationRepository } from '../types/ILocationRepository';
import { DirectusLocationRepository } from './DirectusLocationRepository';

export async function getEncounterRepository(): Promise<IEncounterRepository> {
	const repository = new YamlEncounterRepository('./encounters');
	await repository.init();
	return repository;
}

export async function getLocationRepository(): Promise<ILocationRepository> {
	const directusBaseUri = process.env.NODE_ENV === 'development'
		? 'https://admin.landofemunah.com/admin'
		: 'http://localhost:8080/admin';

	const repository = new DirectusLocationRepository(directusBaseUri);
	return repository;
}
