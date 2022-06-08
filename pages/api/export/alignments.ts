import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import getAlignments from "@core/actions/GetAlignments"
import { importify } from "@core/utils/ContentfulUtils"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const alignments = await getAlignments()
		res.status(200).json(importify(alignments, "alignment"))
	}
)
