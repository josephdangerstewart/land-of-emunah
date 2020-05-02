import { NextApiResponse } from 'next';
import HttpStatusCodes from 'http-status-codes';
import fs from 'fs';
import util from 'util';
import { v2 as cloudinary } from 'cloudinary';
import creds from '../creds.json';
import { FormidableFile } from '../types/ContributionFormSubmission.js';

cloudinary.config({
	cloud_name: creds.CLOUDINARY_CLOUD_NAME,
	api_key: creds.CLOUDINARY_API_KEY,
	api_secret: creds.CLOUDINARY_API_SECRET,
});

export const readFile = util.promisify(fs.readFile);
export const readdir = util.promisify(fs.readdir);
export const lstat = util.promisify(fs.lstat);

export function uploadImage(file: FormidableFile): Promise<string> {
	console.log(file.path);
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(file.path, {
			folder: 'land-of-emunah'
		}, (err, result) => {
			if (err) {
				return reject(err);
			}

			resolve(result.secure_url);
		});
	});
}

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
