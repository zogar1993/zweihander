import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import getAncestries from "@core/actions/GetAncestries"
import { Ancestry } from "@core/domain/types/Ancestry"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse<ReadonlyArray<Ancestry>>) => {
		const ancestries = await getAncestries()
		res.status(200).json(ancestries)
	}
)
