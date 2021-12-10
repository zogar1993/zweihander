// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getTalents from "@core/actions/GetTalents"
import { Talent } from "@core/domain/Talent"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Array<Talent>>
) {
	const talents = await getTalents()
	res.status(200).json(talents)
}
