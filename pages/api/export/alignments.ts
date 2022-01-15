import getAlignments from "@core/actions/GetAlignments"
import { importify } from "@core/utils/ContentfulUtils"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const alignments = await getAlignments()
	res.status(200).json(importify(alignments, "alignment"))
}

//TODO P1 need to reimport alignments because of encoding
