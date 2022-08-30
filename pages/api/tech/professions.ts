import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import getProfessions from "@core/actions/GetProfessions"
import { ProfessionTech } from "@core/domain/character_sheet/CharacterSheet"
import { Trait } from "@core/domain/types/Profession"
import type { NextApiRequest, NextApiResponse } from "next"

export default withApiAuthRequired(
	async (req: NextApiRequest, res: NextApiResponse<ReadonlyArray<ProfessionTech>>) => {
		const professions = (await getProfessions()).map(x => ({
			name: x.name,
			code: x.code,
			advances: x.advances,
			traits: {
				profession: toTechTrait(x.traits.profession),
				drawback: x.traits.drawback && toTechTrait(x.traits.drawback),
				special: x.traits.special && toTechTrait(x.traits.special)
			}
		}))
		res.status(200).json(professions)
	}
)

const toTechTrait = (trait: Trait) => ({ name: trait.name, code: trait.code, effect: trait.effect })