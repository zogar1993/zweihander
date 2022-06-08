import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import getTalents from "@core/actions/GetTalents"
import { importify } from "@core/utils/ContentfulUtils"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const talents = await getTalents()
		res.status(200).json(importify(talents, "talent"))
	}
)
