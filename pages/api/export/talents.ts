import getTalents from "@core/actions/GetTalents"
import { importify } from "@core/utils/ContentfulUtils"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const talents = await getTalents()
	res.status(200).json(importify(talents, "talent"))
}
