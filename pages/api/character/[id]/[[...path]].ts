// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
				return await get(req, res)
			default:
				res.status(404)
		}
}

//TODO P0 do skeleton for characters

//TODO P0 add authentication
//TODO P0 add trackers
//TODO P0 add create character
//TODO P0 add magic spells modal
//TODO P0 add fix comboboxes of accordion
//TODO P0 add

//TODO P1 add delete character

//TODO P2 visual glitch on css first paint (may be related to https://github.com/styled-components/styled-components/issues/1860)
//TODO P2 Handle responses for failures
//TODO P3 how to be atomic on mongodb

//TODO P4 Do test for react avatar and thumbnail
//TODO P4 make hierarchies of talents for professions
//TODO P4 check for strict experience expenditure

//TODO P4 check that SWR is used correctly
//TODO P4 check this works correctly https://github.com/vercel/next.js/issues/30802
//TODO P4 check this linting issue https://stackoverflow.com/questions/69061240/nextjs-importing-next-document-outside-of-pages-document-error

async function get(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query
	if (Array.isArray(id)) {
		res.status(500)
		return
	}
	const client = await getCharacterSheetOfId(id)
	res.status(200).json(client)
}
