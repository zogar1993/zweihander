import { getAncestries } from "@core/actions/GetAncestries"
import { importify } from "@core/utils/ContentfulUtils"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const ancestries = await getAncestries()
	res.status(200).json(importify(ancestries, "ancestry"))
}
