import getArchetypes, { Archetype } from "@core/actions/GetArchetypes"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Array<Archetype>>
) {
	const archetypes = await getArchetypes()
	res.status(200).json(archetypes)
}
