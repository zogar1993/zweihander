import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import getMagicSchools from "@core/actions/GetMagicSchools"
import { MagicSchoolTech } from "@core/domain/character_sheet/CharacterSheet"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse<Array<MagicSchoolTech>>) => {
		const schools = (await getMagicSchools()).map(x => ({
			name: x.name,
			code: x.code,
			source: x.source,
			spells: x.spells.map(y => ({
				name: y.name,
				code: y.code,
				effect: y.effect,
				principle: y.principle
			}))
		}))
		res.status(200).json(schools)
	}
)
