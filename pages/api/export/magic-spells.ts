import type { NextApiRequest, NextApiResponse } from 'next'
import getMagicSpells from "../../../lib/GetMagicSpells"
import getTalents from "../../../lib/GetTalents"
import {importify} from "../../../lib/utils/ContentfulUtils"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const spells = await getMagicSpells()
	res.status(200).json(importify(spells, "magic_spell"))
}
