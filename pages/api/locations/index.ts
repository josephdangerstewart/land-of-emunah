import { NextApiResponse } from 'next';
import { getLocationRepository } from '../../../api/type-registry';

export default async (_, res: NextApiResponse) => {
	const repository = await getLocationRepository();
	const paths = await repository.getPaths();
	return res.json({ paths });
}
