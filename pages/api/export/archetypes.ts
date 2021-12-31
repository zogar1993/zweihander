import getArchetypes from "@core/actions/GetArchetypes"
import { importify } from "@core/utils/ContentfulUtils"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const archetypes = await getArchetypes()
	res.status(200).json(importify(archetypes, "archetype"))
}
