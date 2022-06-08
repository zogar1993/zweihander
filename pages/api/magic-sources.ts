import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import getMagicSources from "@core/actions/GetMagicSources"
import { MagicSource } from "@core/domain/MagicSource"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse<Array<MagicSource>>) => {
		const sources = await getMagicSources()
		res.status(200).json(sources)
	}
)
