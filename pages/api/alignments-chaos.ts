import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import { Alignment } from "@core/actions/GetAlignments"
import getChaosAlignments from "@core/actions/GetChaosAlignments"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse<Array<Alignment>>) => {
		const alignments = await getChaosAlignments()
		res.status(200).json(alignments)
	}
)
