import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import { Weapon } from "@core/domain/types/Weapon"
import type { NextApiRequest, NextApiResponse } from "next"
import getWeapons from "@core/actions/GetWeapons"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse<ReadonlyArray<Weapon>>) => {
		const weapons = await getWeapons()
		res.status(200).json(weapons)
	}
)