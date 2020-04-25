import { NextApiRequest, NextApiResponse } from 'next';
import { getLocationRepository } from '../../../../api/type-registry';
import { notFound } from '../../../../api/api-utility';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const path = req.query.path as string;
	const location = req.query.location as string;

	const repository = await getLocationRepository();
	const locationDto = await repository.getLocation(path, location);

	if (!locationDto) {
		return notFound(res, 'Location was not found');
	}

	return res.json({ location: locationDto });
}
