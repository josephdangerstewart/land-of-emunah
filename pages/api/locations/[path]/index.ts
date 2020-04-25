import { NextApiRequest, NextApiResponse } from 'next';
import { getLocationRepository } from '../../../../api/type-registry';
import { notFound } from '../../../../api/api-utility';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const path = req.query.path as string;

	const repository = await getLocationRepository();
	const locations = await repository.getLocations(path);

	if (!locations) {
		return notFound(res, 'Locations could not be found');
	}

	return res.json({ locations });
};
