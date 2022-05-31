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

//TODO P2 Handle responses for failures
//TODO P2 visual glitch on css first paint (may be related to https://github.com/styled-components/styled-components/issues/1860)

//TODO P4 make hierarchies of talents for professions
//TODO P4 check for strict experience expenditure

//TODO P? add autofiller of old character sheets to keep them consistent on db

//TODO Do test for react avatar and thumbnail
//TODO fix hermanos macana are darker when delete

//TODO add book distinction
//TODO add creatures
//TODO add weapons
//TODO add undo on react for failing server changes
//TODO capacidad de transferir un personaje?

//TODO remove visibility of emails
//TODO make private characters distinctive
//TODO add authentication to every endpoint and page
//TODO add confirmation to create and authorise an account
//TODO restyle character screen
//TODO clean make production ready Google auth https://manage.auth0.com/dashboard/us/dev-n9rzdoj9/connections/social/con_qdQyo5cLkfHDZGnD/settings
