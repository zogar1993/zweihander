import { Alignment } from "@core/actions/GetAlignments"
import getOrderAlignments from "@core/actions/GetOrderAlignments"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Array<Alignment>>
) {
	const alignments = await getOrderAlignments()
	res.status(200).json(alignments)
}
