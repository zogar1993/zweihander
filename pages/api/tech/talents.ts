import getTalents from "@core/actions/GetTalents"
import { TalentTech } from "@core/domain/character_sheet/CharacterSheet"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Array<TalentTech>>
) {
	const talents = (await getTalents()).map(x => ({
		name: x.name,
		code: x.code,
		effect: x.effect
	}))
	res.status(200).json(talents)
}
