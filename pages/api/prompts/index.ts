import { NextApiRequest, NextApiResponse } from 'next';
import { getPromptRepository } from '../../../api/type-registry';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const repository = await getPromptRepository();
	const prompt = await repository.getPrompt();
	return res.json({ prompt });
};
