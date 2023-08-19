import { IEncounterRepository } from '../types/IEncounterRepository';
import { ILocationRepository } from '../types/ILocationRepository';
import { IPromptRepository } from '../types/IPromptRepository';
import { DirectusPromptRepository } from './DirectusPromptRepository';
import { YamlEncounterRepository } from './YamlEncounterRepository';
import { YamlLocationRepository } from './YamlLocationRepository';

const DIRECTUS_DEV_URL = 'https://admin.landofemunah.com/admin';
const DIRECTUS_PROD_URL = 'https://admin.landofemunah.com/admin';

const directusBaseUri = process.env.NODE_ENV === 'development'
		? DIRECTUS_DEV_URL
		: DIRECTUS_PROD_URL;

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

export async function getPromptRepository(): Promise<IPromptRepository> {
	const repository = new DirectusPromptRepository(directusBaseUri);
	return repository;
}
