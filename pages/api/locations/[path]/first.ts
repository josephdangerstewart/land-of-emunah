import { NextApiRequest, NextApiResponse } from 'next';
import { getLocationRepository } from '../../../../api/type-registry';
import { notFound, withAlerting } from '../../../../api/api-utility';

export default withAlerting(async (req: NextApiRequest, res: NextApiResponse) => {
	const path = req.query.path as string;

	const repository = await getLocationRepository();
	const nextLocation = await repository.getNextLocation(path);

	if (!nextLocation) {
		return notFound(res, 'No first location found');
	}

	return res.json({ nextLocation });
});
