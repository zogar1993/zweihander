// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from "@auth0/nextjs-auth0"
import createCharacter from "@core/actions/CreateCharacter"
import { getCharacters } from "@core/actions/GetCharacters"
import sanitizeCharacterSheet from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession(req, res)
	if (!session) return res.status(401).end()
	const username = session.user.nickname

	if (!req.query.path)
		switch (req.method) {
			case "GET":
				const characters = await getCharacters() //TODO do this directly on DB
				const filtered = characters.filter(
					x => x.visibility !== "private" || x.created_by === username
				)
				return res.status(200).json(filtered)
			case "POST":
				const id = await createCharacter(
					sanitizeCharacterSheet({ created_by: username })
				)
				return res.status(201).json(`"/characters/${id}"`)
			default:
				return res.status(405).end()
		}
}
