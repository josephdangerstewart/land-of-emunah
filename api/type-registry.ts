import { google } from 'googleapis';
import * as path from 'path';
import { IEncounterRepository } from '../types/IEncounterRepository';
import { ILocationRepository } from '../types/ILocationRepository';
import { IPromptRepository } from '../types/IPromptRepository';
import { YamlEncounterRepository } from './YamlEncounterRepository';
import { YamlLocationRepository } from './YamlLocationRepository';
import { GooglePromptRepository } from './GooglePromptRepository';

const credentialsPath = path.join(__dirname, 'googleCreds.json');

const auth = new google.auth.GoogleAuth({
	keyFile: credentialsPath,
	scopes: [
		'https://www.googleapis.com/auth/spreadsheets',
	],
});

google.options({ auth });

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
	const repository = new GooglePromptRepository();
	return repository;
}
