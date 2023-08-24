import { NextApiResponse, NextApiRequest } from 'next';
import HttpStatusCodes from 'http-status-codes';
import fs from 'fs/promises';
import path from 'path';
import { google } from 'googleapis';
import AWS from 'aws-sdk';
import { FormidableFile } from '../types/ContributionFormSubmission.js';
import { DateTime } from 'luxon';
import cuid from 'cuid';
import * as Sentry from '@sentry/node';
import useragent from 'useragent';

const creds = {
	"SENTRY_DSN": "",
}

AWS.config.loadFromPath(path.resolve('./awsCreds.json'));

export async function uploadImage(file: FormidableFile): Promise<string> {
	const s3Client = new AWS.S3();

	console.log(await new AWS.STS().getCallerIdentity().promise());

	let fileHandle: fs.FileHandle;
	try {
		fileHandle = await fs.open(file.path);
		const readStream = fileHandle.createReadStream();

		const response = await s3Client.upload({
			Bucket: 'loe-submissions-bucket',
			Key: `${cuid()}${path.extname(file.path)}`,
			Body: readStream,
			ACL: 'public-read',
		}).promise();

		return response.Location;
	} finally {
		await fileHandle?.close();
	}
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
	const result = await google.recaptchaenterprise("v1").projects.assessments.create({
		requestBody: {
			event: {
				siteKey: '6Lffh8AnAAAAAJEgHGW4hxQroFIXo7wM-lnF_-bG',
				token,
			},
		},
		parent: 'projects/personal-projects-396500'
	});

	return {
		success: result?.data?.tokenProperties?.valid,
	};
}

export interface DirectusAsset {
	data: {
		url: string;
	};
}
