import { Alignment } from "@core/actions/GetAlignments"
import getChaosAlignments from "@core/actions/GetChaosAlignments"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Array<Alignment>>
) {
	const alignments = await getChaosAlignments()
	res.status(200).json(alignments)
}
