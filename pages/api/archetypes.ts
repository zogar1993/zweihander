import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import getArchetypes, { Archetype } from "@core/actions/GetArchetypes"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse<ReadonlyArray<Archetype>>) => {
		const archetypes = await getArchetypes()
		res.status(200).json(archetypes)
	}
)
