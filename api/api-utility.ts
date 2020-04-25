import { IEncounterRepository } from '../types/IEncounterRepository';
import { FsEncounterRepository } from './FsEncounterRepository';
import { NextApiResponse } from 'next';
import HttpStatusCodes from 'http-status-codes';

export async function getEncounterRepository(): Promise<IEncounterRepository> {
	const repository = new FsEncounterRepository();
	await repository.init();
	return repository;
}

export function notFound(res: NextApiResponse, message?: string) {
	res.status(HttpStatusCodes.NOT_FOUND).json({ message });
}
