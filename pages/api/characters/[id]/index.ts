// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import deleteCharacterSheetOfId from "@core/actions/DeleteCharacterSheetOfId"
import getCharacterSheetOfId from "@core/actions/GetCharacterSheetOfId"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const id = req.query.id
	if (Array.isArray(id)) {
		res.status(500)
		return
	}

	if (!req.query.path)
		switch (req.method) {
			case "GET":
				return await getHandler(req, res)
			case "DELETE":
				return await deleteHandler(req, res)
			default:
				res.status(404)
		}
}

//TODO P0 add trackers
//TODO P0 add create character

//TODO P0 check why response fromserver never comes

//TODO P2 Handle responses for failures
//TODO P0 how to be atomic on mongodb
//TODO P0 add autofiller of old character sheets to keep them consistent on db

//TODO P4 Do test for react avatar and thumbnail
//TODO P0 add fix comboboxes of accordion

//TODO P4 make hierarchies of talents for professions
//TODO P4 check for strict experience expenditure

//TODO P4 doing CTRL + z leaves currently edited combobox weird (happens with profession chains)
//TODO P0 add authentication
//TODO P2 visual glitch on css first paint (may be related to https://github.com/styled-components/styled-components/issues/1860)
//TODO P2 check that SWR is used correctly
//TODO P4 check this works correctly https://github.com/vercel/next.js/issues/30802
//TODO P4 dont allow characters screen redirection to self

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query
	const character = await getCharacterSheetOfId(id as string)
	res.status(200).json(character)
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query
	await deleteCharacterSheetOfId(id as string)
	res.status(204)
}
