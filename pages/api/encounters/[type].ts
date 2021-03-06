import { NextApiRequest, NextApiResponse } from 'next';
import { notFound, withAlerting } from '../../../api/api-utility';
import { getEncounterRepository } from '../../../api/type-registry';

export default withAlerting(async (req: NextApiRequest, res: NextApiResponse) => {
	const type = req.query.type as string;
	const pastEncounters = (req.query.pastEncounters ?? '') as string;
	const locationId = req.query.locationId as string;

	const repository = await getEncounterRepository();
	const encounter = await repository.getRandomEncounter(pastEncounters.split(','), type, locationId);

	if (!encounter) {
		return notFound(res, 'Encounter not found');
	}

	return res.json({ encounter });
});
