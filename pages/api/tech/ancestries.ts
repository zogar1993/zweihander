import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import getAncestries from "@core/actions/GetAncestries"
import { AncestryTech } from "@core/domain/character_sheet/CharacterSheet"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse<Array<AncestryTech>>) => {
		const ancestries = (await getAncestries()).map(x => ({
			name: x.name,
			code: x.code,
			attribute_bonuses: x.attribute_bonuses,
			traits: x.traits.map(y => ({
				name: y.name,
				code: y.code,
				effect: y.effect,
				from: y.from,
				to: y.to
			}))
		}))
		res.status(200).json(ancestries)
	}
)
