import { NextApiRequest, NextApiResponse } from 'next';
import { getEncounterRepository } from '../../../../api/type-registry';
import { notFound } from '../../../../api/api-utility';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const type = req.query.type as string;
	const repository = await getEncounterRepository();

	const encounter = await repository.getFinalEncounter(type);

	if (!encounter) {
		return notFound(res, 'Encounter type not found');
	}

	return { encounter };
};
