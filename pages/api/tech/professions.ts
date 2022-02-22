import getProfessions from "@core/actions/GetProfessions"
import { ProfessionTech } from "@core/domain/character_sheet/CharacterSheet"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Array<ProfessionTech>>
) {
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
