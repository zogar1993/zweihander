import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import getProfessions from "@core/actions/GetProfessions"
import { ProfessionTech } from "@core/domain/character_sheet/CharacterSheet"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse<ReadonlyArray<ProfessionTech>>) => {
		const professions = (await getProfessions()).map(x => ({
			name: x.name,
			code: x.code,
			advances: x.advances,
			traits: x.traits.map(y => ({
				name: y.name,
				code: y.code,
				effect: y.effect
			}))
		}))
		res.status(200).json(professions)
	}
)
