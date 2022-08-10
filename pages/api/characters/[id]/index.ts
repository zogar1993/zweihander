import { getSession } from "@auth0/nextjs-auth0"
import deleteCharacterSheetOfId from "@core/actions/DeleteCharacterSheetOfId"
import getCharacterSheetOfId from "@core/actions/GetCharacterSheetOfId"
import getCharacterSheetOfIdMetadata from "@core/actions/GetCharacterSheetOfIdMetadata"
import { ROLES_PROPERTY_NAME, UserRole } from "@web/components/character_sheet/hooks/UseHasAdminRole"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession(req, res)
	if (!session) return res.status(401).end()

	const id = req.query.id
	if (Array.isArray(id)) return res.status(500).end()

	const isAdmin = session.user[ROLES_PROPERTY_NAME].includes(UserRole.Admin)
	const isUser = session.user[ROLES_PROPERTY_NAME].includes(UserRole.User)

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
				const character = await getCharacterSheetOfIdMetadata(id)
				if (character === null) return res.status(404).end()
				const isOwner = session.user.email === character.created_by
				if (!isAdmin && !(isOwner && isUser)) return res.status(403).end()
				await deleteCharacterSheetOfId(id)
				return res.status(204).end()
			}
			default:
				res.status(405).end()
		}
}
