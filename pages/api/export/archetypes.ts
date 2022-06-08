import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import getArchetypes from "@core/actions/GetArchetypes"
import { importify } from "@core/utils/ContentfulUtils"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const archetypes = await getArchetypes()
		res.status(200).json(importify(archetypes, "archetype"))
	}
)
