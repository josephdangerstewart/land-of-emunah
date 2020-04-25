import { NextApiRequest, NextApiResponse } from 'next';
import { getEncounterRepository, notFound } from '../../../api/api-utility';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const repository = await getEncounterRepository();

	const { type, pastEncounters } = req.query;

	const encounter = await repository.getRandomEncounter((pastEncounters as string).split(','), type as string);

	if (!encounter) {
		return notFound(res, 'Encounter not found')
	}

	return res.json({ encounter });
}
