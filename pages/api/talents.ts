import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import getTalents from "@core/actions/GetTalents"
import { Talent } from "@core/domain/types/Talent"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse<ReadonlyArray<Talent>>) => {
		const talents = await getTalents()
		res.status(200).json(talents)
	}
)
