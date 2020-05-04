import { NextApiResponse } from 'next';
import { getLocationRepository } from '../../../api/type-registry';
import { withAlerting } from '../../../api/api-utility';

export default withAlerting(async (_, res: NextApiResponse) => {
	const repository = await getLocationRepository();
	const paths = await repository.getPaths();
	return res.json({ paths });
});
