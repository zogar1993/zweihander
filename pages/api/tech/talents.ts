import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import getTalents from "@core/actions/GetTalents"
import { TraitTech } from "@core/domain/character_sheet/CharacterSheet"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse<ReadonlyArray<TraitTech>>) => {
		const talents = (await getTalents()).map(x => ({
			name: x.name,
			code: x.code,
			effect: x.effect
		}))
		res.status(200).json(talents)
	}
)
