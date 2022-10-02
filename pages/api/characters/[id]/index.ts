import deleteCharacterSheetOfId from "@core/actions/DeleteCharacterSheetOfId"
import getCharacterSheetOfId from "@core/actions/GetCharacterSheetOfId"
import getCharacterSheetOfIdMetadata from "@core/actions/GetCharacterSheetOfIdMetadata"
import getUser from "@core/utils/Authorization"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const user = await getUser({req, res})
	if (!user.isLoggedIn) return res.status(401).end()

	const id = req.query.id
	if (Array.isArray(id)) return res.status(500).end()

	if (!req.query.path)
		switch (req.method) {
			case "GET": {
				const character = await getCharacterSheetOfId(id)
				if (character.settings.visibility === "private")
					if (user.email !== character.created_by)
						return res.status(403).end()

				return res.status(200).json(character)
			}
			case "DELETE": {
				const character = await getCharacterSheetOfIdMetadata(id)
				if (character === null) return res.status(404).end()
				const isOwner = user.email === character.created_by
				if (!user.isAdmin && !isOwner) return res.status(403).end()
				await deleteCharacterSheetOfId(id)
				return res.status(204).end()
			}
			default:
				res.status(405).end()
		}
}
