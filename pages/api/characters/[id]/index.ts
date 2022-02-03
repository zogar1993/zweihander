// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from "@auth0/nextjs-auth0"
import deleteCharacterSheetOfId from "@core/actions/DeleteCharacterSheetOfId"
import getCharacterSheetOfId from "@core/actions/GetCharacterSheetOfId"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession(req, res)
	if (!session) return res.status(401).end()

	const id = req.query.id
	if (Array.isArray(id)) return res.status(500).end()

	if (!req.query.path)
		switch (req.method) {
			case "GET": {
				const character = await getCharacterSheetOfId(id as string)
				if (character.settings.visibility === "private")
					if (session.user.nickname !== character.created_by)
						return res.status(403).end()

				return res.status(200).json(character)
			}
			case "DELETE": {
				const character = await getCharacterSheetOfId(id as string) //TODO could bring only what is necessary instead
				if (session.user.nickname !== character.created_by)
					return res.status(403).end()
				await deleteCharacterSheetOfId(id as string)
				return res.status(204).end()
			}
			default:
				res.status(405).end()
		}
}

//TODO P0 add trackers

//TODO P2 Handle responses for failures
//TODO P1 how to be atomic on mongodb
//TODO P0 add autofiller of old character sheets to keep them consistent on db

//TODO P4 Do test for react avatar and thumbnail
//TODO P0 add fix comboboxes of accordion

//TODO P4 make hierarchies of talents for professions
//TODO P4 check for strict experience expenditure

//TODO P4 doing CTRL + z leaves currently edited combobox weird (happens with profession chains)
//TODO P2 visual glitch on css first paint (may be related to https://github.com/styled-components/styled-components/issues/1860)
//TODO P2 check that SWR is used correctly
//TODO P4 check this works correctly https://github.com/vercel/next.js/issues/30802
