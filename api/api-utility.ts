import { NextApiResponse, NextApiRequest } from 'next';
import HttpStatusCodes from 'http-status-codes';
import fs from 'fs';
import util from 'util';
import { v2 as cloudinary } from 'cloudinary';
import { FormidableFile } from '../types/ContributionFormSubmission.js';
import { DateTime } from 'luxon';
import axios from 'axios';
import * as Sentry from '@sentry/node';
import useragent from 'useragent';

const creds = {
	"CLOUDINARY_CLOUD_NAME": "",
	"CLOUDINARY_API_KEY": "",
	"CLOUDINARY_API_SECRET": "",
	"SENTRY_DSN": "",
	"CAPTCHA_SECRET": ""
}

cloudinary.config({
	cloud_name: creds.CLOUDINARY_CLOUD_NAME,
	api_key: creds.CLOUDINARY_API_KEY,
	api_secret: creds.CLOUDINARY_API_SECRET,
});

export const readFile = util.promisify(fs.readFile);
export const readdir = util.promisify(fs.readdir);
export const lstat = util.promisify(fs.lstat);

export function uploadImage(file: FormidableFile): Promise<string> {
	return Promise.resolve('https://placehold.co/600x400');
}

export function mapYamlFileNameToId(fileName: string): string {
	return fileName.replace(/\.yaml/, '');
}

export function notFound(res: NextApiResponse, message?: string) {
	res.status(HttpStatusCodes.NOT_FOUND).json({ message });
}

export function forbidden(res: NextApiResponse, message?: string) {
	res.status(HttpStatusCodes.FORBIDDEN).json({ message });
}

export function getNow(): string {
	const pst = 'UTC-8';
	return DateTime.local().setZone(pst).toFormat('yyyy-MM-dd');
}

type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => any;

let isSentryInitialized = false;

export function withAlerting(cb: NextApiHandler): NextApiHandler {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		if (!isSentryInitialized) {
			Sentry.init({ dsn: creds.SENTRY_DSN });
			isSentryInitialized = true;
		}

		return new Promise<void>(async (resolve, reject) => {
			try {
				await cb(req, res);
				return resolve();
			} catch (e) {
				Sentry.withScope((scope) => {
					scope.setLevel(Sentry.Severity.Error);

					const agent = useragent.parse(req.headers['user-agent']) ?? {};
					scope.setTags({
						url: req.url,
						method: req.method,
						query: JSON.stringify(req.query),
						userAgentString: req.headers['user-agent'],
						userAgentObject: JSON.stringify(agent),
						browser: agent.family,
						os: agent.os?.family,
						device: agent.device?.family,
						nodeEnv: process?.env?.NODE_ENV,
					});

					Sentry.captureException(e);
				});

				await Sentry.flush();
				reject(e);
			}
		});
	};
};

interface CaptchaResponse {
	success: boolean;
}

export async function validateCaptcha(token): Promise<CaptchaResponse> {
	const url = `https://www.google.com/recaptcha/api/siteverify?secret=${creds.CAPTCHA_SECRET}&response=${token}`;
	const { data } = await axios.post(url);
	return data as CaptchaResponse;
}

export interface DirectusAsset {
	data: {
		url: string;
	};
}
