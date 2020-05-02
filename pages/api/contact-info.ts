import { NextApiRequest, NextApiResponse } from 'next';
import { ContactFormSubmission } from '../../types/ContactFormSubmission';
import { validateCaptcha, forbidden } from '../../api/api-utility';
import { getPromptRepository } from '../../api/type-registry';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const body = req.body as ContactFormSubmission;

	const captchaResponse = await validateCaptcha(body.captchaToken);

	if (!captchaResponse.success) {
		return forbidden(res, 'Invalid captcha');
	}

	const repository = await getPromptRepository();
	repository.submitContactInfo(body);

	return res.json({ status: 200 });
};
