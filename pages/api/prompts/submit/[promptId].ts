import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { ContributionFormSubmission } from '../../../../types/ContributionFormSubmission';
import { getPromptRepository } from '../../../../api/type-registry';
import { notFound, validateCaptcha, forbidden, withAlerting } from '../../../../api/api-utility';

export const config = {
	api: {
		bodyParser: false,
	},
};

async function parseSubmission(req: NextApiRequest): Promise<ContributionFormSubmission> {
	return new Promise((resolve, reject) => {
		const form = formidable();

		form.parse(req, (err, fields, files) => {
			if (err) {
				return reject(err);
			}

			resolve({ ...fields, fileUpload: files.fileUpload } as ContributionFormSubmission);
		});
	});
}

export default withAlerting(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		return notFound(res);
	}

	const promptId = req.query.promptId as string;
	const data = await parseSubmission(req);

	const response = await validateCaptcha(data.captchaToken);
	
	if (!response.success) {
		return forbidden(res, 'Invalid captcha');
	}

	const repository = await getPromptRepository();

	const prompt = await repository.getPrompt(promptId);
	if (!prompt) {
		return notFound(res, 'Prompt was not found');
	}

	await repository.submitResponse(promptId, data);
	res.json({ status: 200 });
});
