import { NextApiRequest, NextApiResponse } from 'next';
import { getPromptRepository } from '../../../api/type-registry';
import { withAlerting } from '../../../api/api-utility';

export default withAlerting(async (req: NextApiRequest, res: NextApiResponse) => {
	const repository = await getPromptRepository();
	const prompt = await repository.getPrompt();
	return res.json({ prompt });
});
