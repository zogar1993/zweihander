import getProfessions from "@core/actions/GetProfessions"
import { importify } from "@core/utils/ContentfulUtils"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const professions = await getProfessions()
	res.status(200).json(importify(professions, "profession"))
}
