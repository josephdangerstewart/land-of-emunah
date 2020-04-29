import { IEncounterRepository } from '../types/IEncounterRepository';
import { ILocationRepository } from '../types/ILocationRepository';
import { DirectusLocationRepository } from './DirectusLocationRepository';
import { DirectusEncounterRepository } from './DirectusEncounterRepository';

const DIRECTUS_IMAGE_URL = 'http://admin.landofemunah.com';
const DIRECTUS_DEV_URL = 'http://admin.landofemunah.com/admin';
const DIRECTUS_PROD_URL = 'http://localhost:8080/admin';

const directusBaseUri = process.env.NODE_ENV === 'development'
		? DIRECTUS_DEV_URL
		: DIRECTUS_PROD_URL;

export async function getEncounterRepository(): Promise<IEncounterRepository> {
	const repository = new DirectusEncounterRepository(directusBaseUri, DIRECTUS_IMAGE_URL);
	return repository;
}

export async function getLocationRepository(): Promise<ILocationRepository> {
	const repository = new DirectusLocationRepository(directusBaseUri, DIRECTUS_IMAGE_URL);
	return repository;
}
