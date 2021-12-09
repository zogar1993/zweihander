// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { getMagicSources } from "../../lib/GetMagicSources"
import getTalents from "../../lib/GetTalents"
import { Ancestry } from "../../src/Ancestry"
import { MagicSource } from "../../src/MagicSource"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Array<MagicSource>>
) {
	const sources = await getMagicSources()
	res.status(200).json(sources)
}
