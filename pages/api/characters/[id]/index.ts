import { getSession } from "@auth0/nextjs-auth0"
import deleteCharacterSheetOfId from "@core/actions/DeleteCharacterSheetOfId"
import getCharacterSheetOfId, {
	getCharacterSheetMeta
} from "@core/actions/GetCharacterSheetOfId"
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
				const character = await getCharacterSheetOfId(id)
				if (character.settings.visibility === "private")
					if (session.user.email !== character.created_by)
						return res.status(403).end()

				return res.status(200).json(character)
			}
			case "DELETE": {
				const character = await getCharacterSheetMeta(id)
				if (session.user.email !== character.created_by)
					return res.status(403).end()
				await deleteCharacterSheetOfId(id)
				return res.status(204).end()
			}
			default:
				res.status(405).end()
		}
}

//TODO P2 visual glitch on css first paint (may be related to https://github.com/styled-components/styled-components/issues/1860)
//TODO fix hermanos macana are darker when delete
//TODO make characters screen prettier

//TODO P4 make hierarchies of talents for professions
//TODO P4 check for strict experience expenditure

//TODO Do test for react avatar and thumbnail

//TODO add book distinction
//TODO add creatures
//TODO add weapons
//TODO add alternative mercy

//TODO add undo on react for failing server changes
//TODO P2 Handle responses for failures

//TODO capacidad de transferir un personaje?
//TODO P? add autofiller of old character sheets to keep them consistent on db

//TODO P1 remove visibility of emails

//TODO P1 add confirmation to create and authorise an account

//TODO P1 restyle character screen
//TODO P1 check best practices for production ready gmail account
//TODO P1 add test for professions
//TODO P1 add test for magics
//TODO P1 add test for ancestries