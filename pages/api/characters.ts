// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCharacters } from "@core/actions/GetCharacters"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Array<any>>
) {
	const characters = await getCharacters()
	res.status(200).json(characters)
}
