// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAncestries } from "@core/actions/GetAncestries"
import { Ancestry } from "@core/domain/Ancestry"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Array<Ancestry>>
) {
	const ancestries = await getAncestries()
	res.status(200).json(ancestries)
}
