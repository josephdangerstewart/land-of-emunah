import { NextApiResponse } from 'next';
import HttpStatusCodes from 'http-status-codes';
import fs from 'fs';
import util from 'util';

export const readFile = util.promisify(fs.readFile);
export const readdir = util.promisify(fs.readdir);
export const lstat = util.promisify(fs.lstat);

export function mapYamlFileNameToId(fileName: string): string {
	return fileName.replace(/\.yaml/, '');
}

export function notFound(res: NextApiResponse, message?: string) {
	res.status(HttpStatusCodes.NOT_FOUND).json({ message });
}

export interface DirectusAsset {
	data: {
		url: string;
	};
}
