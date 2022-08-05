import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import { Alignment } from "@core/domain/types/Alignment"
import getOrderAlignments from "@core/actions/GetOrderAlignments"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse<Array<Alignment>>) => {
		const alignments = await getOrderAlignments()
		res.status(200).json(alignments)
	}
)
