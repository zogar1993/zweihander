import getMagicSchools from "@core/actions/GetMagicSchools"
import { importify } from "@core/utils/ContentfulUtils"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const spells = await getMagicSchools()
	res.status(200).json(importify(spells, "magic_school"))
}
